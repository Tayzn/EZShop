/**
 * User Cart
 * merematt@udel.edu
 * 4/8/2023
 */

import { User } from "firebase/auth";
import { auth_HookUser } from "../firebase/firebase_auth";
import { CartData } from "../firebase/firebase_data";
import { Product, ProductVariantSelection, productEquals } from "./product";

/**
 * Shared attributes for both the local and database versions of CartItem
 *
 * Not very useful on its own
 */

/**
 * An item in a Cart
 */
export interface CartItem {
    product: Product;
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
 */
export function cart_HookCartState(
    stateDispatcher: React.Dispatch<React.SetStateAction<Cart>>
): Unsubscribe {
    const idx = cartListeners.push(stateDispatcher) - 1;
    return () => {
        cartListeners.splice(idx, 1);
    };
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

export function initializeCart() {
    auth_HookUser((user) => {
        if (user) {
            CartData.getOrCreate(user)
                .then((newCart) => {
                    cart = newCart.data;
                    cartOwner = user;
                    cart_StateChanged();
                })
                .catch((err) => console.error("failed to load cart:", err));
            // TODO merge/clear localstorage
        } else {
            cart = { items: [] };
            cartOwner = null;
            // TODO load localstorage
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
        if (!productEquals(newItem.product, item.product)) return false;
        for (const key in newItem.variants) {
            if (!(key in item.variants)) return false;
            if (newItem.variants[key].name !== item.variants[key].name)
                return false;
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

    if (quantity > item.product.stock) {
        quantity = item.product.stock;
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
export function placeOrder() {
    //TO DO: Submit order to DB

    cart = {
        items: []
    };

    saveCart().then(cart_StateChanged);
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
            // todo save localstorage
            resolve();
        }
    });
}
