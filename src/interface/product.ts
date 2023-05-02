/**
 * Product Item
 * merematt@udel.edu
 * 4/8/2023
 */

import React from "react";
import {
    ProductData,
    ReferencedObject,
    useDatabase
} from "../firebase/firebase_data";

export type ProductVariantSelection = {
    [key: string]: string;
};

export type ProductVariants = {
    [key: string]: string[];
};

export interface Product {
    name: string;
    category: string;
    description: string;
    price: number;
    stock: number;
    variants: ProductVariants;
    image: string;
}

export function productEquals(product1: Product, product2: Product): boolean {
    if (
        product1.name !== product2.name ||
        product1.category !== product2.category ||
        product1.price !== product2.price
    )
        return false;

    for (const key in product1.variants) {
        if (!(key in product2.variants)) return false;
        if (
            !product1.variants[key].every((variant) =>
                product2.variants[key].some((other) => variant === other)
            )
        )
            return false;
    }

    return true;
}

/**
 * Get the list of products
 * @param stateDependencies The state variables that should cause the data to reload
 * @param onSuccess The function to run on successful loading
 * @param onError The function to run if an error occurs
 * @returns The list of products, intially empty until the database loads
 */
export function useProducts(
    stateDependencies?: React.DependencyList,
    onSuccess?: () => void,
    onError?: (reason: string) => void
): ReferencedObject<Product>[] {
    return useDatabase(
        () => ProductData.list(),
        [],
        stateDependencies,
        onSuccess,
        onError
    );
}
