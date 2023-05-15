/**
 * User Cart
 * merematt@udel.edu
 * 4/8/2023
 */

import { User } from "firebase/auth";
import { auth_HookUser } from "../firebase/firebase_auth";
import {
    CartData,
    ProductData,
    ReferencedObject
} from "../firebase/firebase_data";
import { Product, ProductVariantSelection, productEquals } from "./product";
import { useEffect, useState } from "react";
import { Order, createOrder } from "./order";
import { UserAddress, UserPayment, saveAccount } from "./account";

/**
 * An item in a Cart
 */
export interface CartItem {
    product: ReferencedObject<Product>;
    quantity: number;
    variants: ProductVariantSelection;
}

/**
 * An item in a Cart
 *
 * Similar to CartItem, but it stored the database reference as a string
 * since LocalStorage is "cold" and the database may be different when the item is loaded
 */
interface LocalCartItem {
    product: Product;
    id: string;
    quantity: number;
    variants: ProductVariantSelection;
}

/**
 * A users Cart
 */
export interface Cart {
    items: CartItem[];
}

const cartListeners: React.Dispatch<React.SetStateAction<Cart>>[] = [];

export type Unsubscribe = () => void;

/**
 * Attach a React setState function to be called whenever the current cart is changed
 *
 * Always call this inside of a `useEffect` block because you must unsubscribe when the event is no longer needed
 * @param stateDispatcher The setState function to be called
 * @returns An unsubscribe function to remove the setState listener
 * @deprecated useCart()
 */
export function cart_HookCartState(
    stateDispatcher: React.Dispatch<React.SetStateAction<Cart>>
): Unsubscribe {
    return addCartListener(stateDispatcher);
}

function addCartListener(
    stateDispatcher: React.Dispatch<React.SetStateAction<Cart>>
): Unsubscribe {
    const idx = cartListeners.push(stateDispatcher) - 1;
    return () => {
        cartListeners.splice(idx, 1);
    };
}

/**
 * Get the current cart
 */
export function useCart(): Cart {
    const [cart, setCart] = useState<Cart>(getCart());
    useEffect(() => addCartListener(setCart), []);
    return cart;
}

/**
 * Call all cart listeners with the current cart
 */
function cart_StateChanged() {
    cartListeners.forEach((listener) => listener(cart));
}

/**
 * The owner of the current cart. This should always be the logged in user, but this is tracked seperately for safety in case the DB fails to load
 */
let cartOwner: User | null = null;

/**
 * The current cart. Could belong to a user or anonymous in localstorage
 */
let cart: Cart = { items: [] };

function loadLocalCart(remove: boolean) {
    const localCart = localStorage.getItem("cart");
    if (localCart) {
        const parsedCart = (JSON.parse(localCart) as LocalCartItem[]).map(
            (item): CartItem => ({
                product: {
                    data: item.product,
                    reference: ProductData.getReference(item.id)
                },
                quantity: item.quantity,
                variants: item.variants
            })
        );
        parsedCart.forEach((item) => addToCart(item));
        if (remove) localStorage.removeItem("cart");
    }
}

function saveLocalCart() {
    localStorage.setItem(
        "cart",
        JSON.stringify(
            cart.items.map(
                (item): LocalCartItem => ({
                    product: item.product.data,
                    id: item.product.reference.id,
                    quantity: item.quantity,
                    variants: item.variants
                })
            )
        )
    );
}

export function initializeCart() {
    auth_HookUser((user) => {
        if (user) {
            CartData.getOrCreate(user)
                .then((newCart) => {
                    cart = newCart.data;
                    cartOwner = user;
                    cart_StateChanged();
                    loadLocalCart(true);
                })
                .catch((err) => {
                    console.error("failed to load cart:", err);
                });
        } else {
            cart = { items: [] };
            cartOwner = null;
            // load localstorage
            loadLocalCart(false);
            cart_StateChanged();
        }
    });
}

/**
 * Get the current cart
 *
 * This function will transparently select between a logged in users cart and a local cart
 */
export function getCart(): Cart {
    return cart;
}

/**
 * Adds a product to the cart and saves it.
 * If a product that is already in the cart is added, the quantity will be increased.
 */
export function addToCart(newItem: CartItem) {
    const existingItem: number = cart.items.findIndex((item) => {
        if (!productEquals(newItem.product.data, item.product.data))
            return false;
        for (const key in newItem.variants) {
            if (!(key in item.variants)) return false;
            if (newItem.variants[key] !== item.variants[key]) return false;
        }
        return true;
    });

    let newItems: CartItem[];

    if (existingItem !== -1) {
        const updatedItem = {
            ...cart.items[existingItem],
            quantity: cart.items[existingItem].quantity + newItem.quantity
        };
        newItems = [...cart.items];
        newItems.splice(existingItem, 1, updatedItem);
    } else {
        newItems = [...cart.items, newItem];
    }

    cart = {
        items: newItems
    };

    saveCart().then(cart_StateChanged);
}

/**
 * Updates the quantity of an item in the cart.
 */
export function updateCartQuantity(item: CartItem, quantity: number) {
    const existingItem = cart.items.findIndex((cartItem) => cartItem === item);
    if (existingItem === -1) {
        console.warn(
            "Attempted to update the cart quantity of a non-existant item."
        );
        return;
    }

    if (quantity > item.product.data.stock) {
        quantity = item.product.data.stock;
    }

    const updatedItem = {
        ...item,
        quantity: quantity
    };

    const newItems: CartItem[] = [...cart.items];
    newItems.splice(existingItem, 1, updatedItem);

    cart = {
        items: newItems
    };

    saveCart().then(cart_StateChanged);
}

/**
 * Removes a specified item from the cart.
 */
export function removeFromCart(item: CartItem) {
    const newItems: CartItem[] = cart.items.filter(
        (cartItem) => cartItem !== item
    );
    cart = {
        items: newItems
    };

    saveCart().then(cart_StateChanged);
}

/**
 * Submits the cart as an order, then clears the cart.
 */
export function placeOrder(
    user: User | null,
    address: UserAddress,
    payment: UserPayment,
    saveShipping: boolean,
    savePayment: boolean
): Promise<ReferencedObject<Order>> {
    return new Promise((resolve, reject) => {
        // Aggregate the cart into the unique types of items

        type ItemAggregate = {
            [key: string]: [ReferencedObject<Product>, number];
        };

        const stockReduction = cart.items.reduce(
            (datamap: ItemAggregate, item) => {
                // identifier for this item
                const id = item.product.reference.path;

                // if the current item isn't already mapped add it
                if (datamap[id] === undefined) datamap[id] = [item.product, 0];

                // decrement the mapped items stock
                datamap[id][1] += item.quantity;

                return datamap;
            },
            {}
        );

        // Validate that there is enough stock to fulfill the order

        const failedValidations: string[] = [];

        Object.values(stockReduction).forEach((product) => {
            if (product[0].data.stock < product[1]) {
                failedValidations.push(
                    `Invalid quantity for ${product[0].data.name}: Quantity purchased (${product[1]}) cannot exceed the item stock (${product[0].data.stock})`
                );
            }
        });

        if (failedValidations.length > 0) {
            // Reject if there is not enough stock
            reject(failedValidations.join(". \n"));
            return;
        }

        // Update the stock
        Object.values(stockReduction).forEach((product) => {
            product[0].data.stock -= product[1];
            ProductData.update(product[0]);
        });

        const order: Order = {
            date: new Date(),
            items: cart.items,
            user: user === null ? "anonymous" : user.uid,
            status: "pending",
            address: address,
            payment: payment
        };

        createOrder(order)
            .then((newOrder) => {
                resolve(newOrder);
                // Reset the cart
                cart = {
                    items: []
                };

                saveCart().then(cart_StateChanged);
            })
            .catch(reject);

        if (user !== null && (saveShipping || savePayment)) {
            saveAccount(user, address, payment, saveShipping, savePayment);
        }
    });
}

/**
 * Save the current cart
 *
 * This function will transparently save to either the database for a logged in user, or local storage
 */
export function saveCart(): Promise<void> {
    return new Promise((resolve, reject) => {
        if (cartOwner) {
            // save to database
            CartData.update(cartOwner, cart)
                .then(() => resolve())
                .catch(reject);
        } else {
            // save to localstorage
            saveLocalCart();
            resolve();
        }
    });
}
