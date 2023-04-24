/**
 * Temporary data editor
 * merematt@udel.edu & nlago@udel.edu
 * 4/9/2023
 */
import React, { useEffect, useState } from "react";
import { Alert } from "react-bootstrap";
import {
    ProductData,
    ReferencedObject,
    data_HookPromiseState
} from "../../firebase/firebase_data";
import { Product } from "../../interface/product";
import { ProductDisplayComponent } from "./ProductDisplayComponent";
export let array = ["any"];
type propData = {
    category: string;
    isInStock: boolean;
    backorder: boolean;
    currentSearch: string;
    showNoItemsFound: boolean;
    setShowNoItemsFound: (displayNoItemsFound: boolean) => void;
    minprice: string;
    maxprice: string;
};

export function ProductDisplayGrid(props: propData): JSX.Element {
    const [products, setProducts] = useState<ReferencedObject<Product>[]>([]);
    const [loadError, setLoadError] = useState<boolean>(false);
    // loading data is resource intensive so we should avoid doing it
    useEffect(
        () =>
            data_HookPromiseState(
                ProductData.list(),
                setProducts,
                setLoadError
            ),
        []
    );
    function mapProductCategories() {
        products.map((product) => {
            if (!array.includes(product.data.category)) {
                array = [...array, product.data.category];
            }
        });
    }
    mapProductCategories();

    function determineShowProduct(product: ReferencedObject<Product>) {
        //this function just returns a boolean representing if the product in the
        //product mapping meets filter requirements and search.
        if (
            product.data.price <= parseInt(props.maxprice) &&
            product.data.price >= parseInt(props.minprice) &&
            (product.data.name
                .toLowerCase()
                .includes(props.currentSearch.toLowerCase()) ||
                props.currentSearch === "" ||
                product.data.category
                    .toLowerCase()
                    .includes(props.currentSearch.toLowerCase())) &&
            (product.data.category === props.category ||
                props.category === "any") &&
            ((props.isInStock === true && product.data.stock > 0) ||
                (props.backorder === true && product.data.stock <= 0))
        ) {
            if (!props.showNoItemsFound) {
                props.setShowNoItemsFound(true);
            }
            return true;
        }
        return false;
    }

    return (
        <div>
            {loadError ? (
                <Alert variant="danger">Failed to load products</Alert>
            ) : (
                <div className="item-grid">
                    {products[0] !== undefined ? (
                        products.map((product) => {
                            if (determineShowProduct(product)) {
                                return (
                                    <ProductDisplayComponent
                                        key={product.reference.id}
                                        product={product}
                                    />
                                );
                            }
                        })
                    ) : (
                        <div>No items to load</div>
                    )}
                </div>
            )}
            <div
                hidden={props.showNoItemsFound}
                className="NoItemsFoundMessage"
            >
                No Items Found
            </div>
        </div>
    );
}
