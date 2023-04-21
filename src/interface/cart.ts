/**
 * User Cart
 * merematt@udel.edu
 * 4/8/2023
 */

import { auth_HookUser } from "../firebase/firebase_auth";
import { CartData } from "../firebase/firebase_data";
import { Product, ProductVariant } from "./product";

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
    variant: ProductVariant | null;
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

function cart_StateChanged() {
    cartListeners.forEach((listener) => listener(cart));
}

let cartOwner: string | null = null;
let cart: Cart = { items: [] };

export function initializeCart() {
    auth_HookUser((user) => {
        if (user) {
            CartData.getOrCreate(user.uid)
                .then((newCart) => {
                    cart = newCart.data;
                    cartOwner = user.uid;
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
export function addToCart(
    product: Product,
    quantity: number,
    variationIdx: number | null
): void {
    const sameProduct: number = cart.items.findIndex((item) => {
        let variationCheck = false;

        if (variationIdx !== null) {
            variationCheck =
                item.variant === null
                    ? false
                    : item.variant.name ===
                          product.variants[variationIdx].name &&
                      item.variant.description ===
                          product.variants[variationIdx].description;
        } else {
            variationCheck = item.variant === null;
        }

        return item.product.name === product.name && variationCheck;
    });

    if (sameProduct !== -1) {
        cart.items[sameProduct].quantity += 1;
        saveCart();
        return;
    }

    const newCartItem: CartItem = {
        product: product,
        quantity: quantity,
        variant: variationIdx !== null ? product.variants[variationIdx] : null
    };

    cart = {
        items: [...cart.items, newCartItem]
    };
    saveCart()
        .then(() => cart_StateChanged())
        .catch(console.error);
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
