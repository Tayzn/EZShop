/**
 * User Cart
 * merematt@udel.edu
 * 4/8/2023
 */

import { Product, ProductVariant } from "./product";
import { UserId } from "./account";

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
    variant: ProductVariant;
}

/**
 * A users Cart
 */
export interface Cart {
    owner: UserId;
    items: CartItem[];
}
