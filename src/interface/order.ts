/**
 * Order
 * merematt@udel.edu
 * 4/20/2023
 */

import React from "react";
import {
    OrderData,
    ReferencedObject,
    useDatabase
} from "../firebase/firebase_data";
import { UserAddress, UserId, UserPayment } from "./account";
import { CartItem } from "./cart";
import { User } from "firebase/auth";

export type OrderStatus = "pending" | "shipped" | "complete";

export interface Order {
    date: Date;
    items: CartItem[];
    user: UserId;
    status: OrderStatus;
    address: UserAddress;
    payment: UserPayment;
}

/**
 * Get the orders for a user
 * @param user The user to fetch
 * @param onSuccess The function to run on successful load
 * @param onError The function to run if an error occurs
 * @returns A list of orders initially empty until the database loads, or empty if there is no user provided
 */
export function useOrders(
    user: User,
    stateDependencies?: React.DependencyList,
    onSuccess?: () => void,
    onError?: (reason: string) => void
): ReferencedObject<Order>[] {
    return useDatabase(
        () => OrderData.list(user),
        [],
        stateDependencies,
        onSuccess,
        onError
    );
}

export function useAllOrders(
    user: User | null,
    stateDependencies?: React.DependencyList,
    onSuccess?: () => void,
    onError?: (reason: string) => void
): ReferencedObject<Order>[] {
    return useDatabase(
        () => OrderData.listAll(user),
        [],
        stateDependencies,
        onSuccess,
        onError
    );
}

export function createOrder(order: Order): Promise<void> {
    return new Promise((resolve, reject) => {
        OrderData.create(order)
            .then(() => resolve())
            .catch(reject);
    });
}

export function setOrderStatus(
    order: ReferencedObject<Order>,
    newStatus: OrderStatus
) {
    order.data = { ...order.data, status: newStatus };
    OrderData.update(order);
}

export function deleteOrder(order: ReferencedObject<Order>) {
    OrderData.delete(order.reference);
}
