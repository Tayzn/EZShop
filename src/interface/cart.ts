/**
 * User Cart
 * merematt@udel.edu
 * 4/8/2023
 */

import { Product } from "./product";
import { ReferencedObject } from "../firebase/firebase_data";

/**
 * Shared attributes for both the local and database versions of CartItem
 *
 * Not very useful on its own
 */
export interface CartItemAttributes {
    quantity: number;
    primaryVariant: number | null;
    secondaryVariant: number | null;
}

/**
 * An item in a Cart
 */
export interface CartItem extends CartItemAttributes {
    product: ReferencedObject<Product>;
}

/**
 * The same as CartItem, except that the product is stored by its string id
 */
export interface DatabaseCartItem extends CartItemAttributes {
    productId: string;
}

/**
 * A users Cart
 */
export interface Cart {
    ownerUid: string;
    items: CartItem[];
}

/**
 * The same as Cart, except with the database variant of CartItems
 */
export interface DatabaseCart {
    ownerUid: string;
    items: DatabaseCartItem[];
}

/**
 * Convert a CartItem into its database representation
 */
export function cart_ConvertForDatabase(cartItem: CartItem): DatabaseCartItem {
    return {
        productId: cartItem.product.reference.id,
        quantity: cartItem.quantity,
        primaryVariant: cartItem.primaryVariant,
        secondaryVariant: cartItem.secondaryVariant
    };
}
