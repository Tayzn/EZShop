/**
 * Product Item
 * merematt@udel.edu
 * 4/8/2023
 */

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
    variants: ProductVariant[];
}
