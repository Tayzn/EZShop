/**
 * Product Item
 * merematt@udel.edu
 * 4/8/2023
 */

export type ProductVariantSelection = {
    [key: string]: ProductVariant;
};

export type ProductVariants = {
    [key: string]: ProductVariant[];
};

export interface ProductVariant {
    name: string;
    description: string;
}

export interface Product {
    name: string;
    category: string;
    description: string;
    price: number;
    stock: number;
    variants: ProductVariants;
}
