/**
 * Product Item
 * merematt@udel.edu
 * 4/8/2023
 */

export interface Product {
    name: string;
    category: string;
    stock: number;
    primaryVariants: string[] | null;
    secondaryVariants: string[] | null;
}
