/**
 * Temporary data editor
 * merematt@udel.edu & nlago@udel.edu
 * 4/9/2023
 */
type propData = {
    category: string;
    isInStock: boolean;
    backorder: boolean;
};

import React, { useEffect, useState } from "react";
import { Alert, Button, Modal, Stack, Toast } from "react-bootstrap";
import {
    ProductData,
    ReferencedObject,
    data_HookPromiseState
} from "../../firebase/firebase_data";
import { Product } from "../../interface/product";
import { ProductDisplayComponent } from "./ProductDisplayComponent";
import { ProductFormComponent } from "./ProductFormComponent";
//import { type } from "os";

export function ProductDisplayGrid(props: propData): JSX.Element {
    const [products, setProducts] = useState<ReferencedObject<Product>[]>([]);
    const [loadError, setLoadError] = useState<boolean>(false);

    const [newItem, setNewItem] = useState<boolean>(false);

    const [itemCreateSuccess, setItemCreateSuccess] = useState<boolean>(false);
    const [itemEditSuccess, setItemEditSuccess] = useState<boolean>(false);
    const [itemDeleteSuccess, setItemDeleteSuccess] = useState<boolean>(false);

    // loading data is resource intensive so we should avoid doing it
    useEffect(
        () =>
            data_HookPromiseState(
                ProductData.list(),
                setProducts,
                setLoadError
            ),
        [itemCreateSuccess, itemDeleteSuccess]
    );

    return (
        <div>
            <Stack direction="vertical" className="m-3">
                <Button onClick={() => setNewItem(true)}>New Item</Button>
                <Toast
                    bg="success"
                    onClose={() => setItemCreateSuccess(false)}
                    show={itemCreateSuccess}
                    delay={5000}
                    autohide
                    className="w-100 my-2"
                >
                    <Toast.Body>Successfully added item</Toast.Body>
                </Toast>
                <Toast
                    bg="success"
                    onClose={() => setItemEditSuccess(false)}
                    show={itemEditSuccess}
                    delay={5000}
                    autohide
                    className="w-100 my-2"
                >
                    <Toast.Body>Successfully edited item</Toast.Body>
                </Toast>
                <Toast
                    bg="success"
                    onClose={() => setItemDeleteSuccess(false)}
                    show={itemDeleteSuccess}
                    delay={5000}
                    autohide
                    className="w-100 my-2"
                >
                    <Toast.Body>Successfully deleted item</Toast.Body>
                </Toast>
            </Stack>
            {loadError ? (
                <Alert variant="danger">Failed to load products</Alert>
            ) : (
                <div className="item-grid">
                    {products[0] !== undefined ? (
                        products.map((product) => {
                            if (
                                ((product.data.category === props.category ||
                                    props.category === "any") &&
                                    props.isInStock === true &&
                                    product.data.stock > 0) ||
                                (props.backorder === true &&
                                    product.data.stock <= 0)
                            ) {
                                return (
                                    <ProductDisplayComponent
                                        key={product.reference.id}
                                        product={product}
                                        admin={true}
                                        deletedDispatcher={setItemDeleteSuccess}
                                        editedDispatcher={setItemEditSuccess}
                                    />
                                );
                            }
                        })
                    ) : (
                        <Alert variant="undefinedProducts">
                            No items to show
                        </Alert>
                    )}
                </div>
            )}
            <Modal show={newItem} onHide={() => setNewItem(false)}>
                <Modal.Header>
                    <Modal.Title>New Item</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ProductFormComponent
                        completedDispatcher={(success) => {
                            setItemCreateSuccess(success);
                            setNewItem(false);
                        }}
                    />
                </Modal.Body>
            </Modal>
        </div>
    );
}
