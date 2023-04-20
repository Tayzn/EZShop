/**
 * Order
 * merematt@udel.edu
 * 4/20/2023
 */

import { UserAddress, UserId, UserPayment } from "./account";
import { CartItem } from "./cart";

export type OrderStatus = "pending" | "shipped" | "complete";

export interface Order {
    date: Date;
    items: CartItem;
    user: UserId;
    status: OrderStatus;
    address: UserAddress;
    payment: UserPayment;
}
