/**
 * Product Display Component
 * merematt@udel.edu & nlago@udel.edu
 * 4/9/2023
 */

import React, { useState } from "react";
import { Product } from "../../interface/product";
import { ProductData, ReferencedObject } from "../../firebase/firebase_data";
import { Badge, Button, Card, Modal, Toast } from "react-bootstrap";
import { DocumentReference } from "firebase/firestore";
import { ProductFormComponent } from "./ProductFormComponent";
import { Image } from "react-bootstrap";
import { addToCart } from "../../interface/cart";

export function ProductDisplayComponent({
    product,
    admin,
    deletedDispatcher,
    editedDispatcher
}: {
    product: ReferencedObject<Product>;
    admin: boolean;
    deletedDispatcher?: React.Dispatch<React.SetStateAction<boolean>>;
    editedDispatcher?: React.Dispatch<React.SetStateAction<boolean>>;
}): JSX.Element {
    const [itemDeleteFail, setItemDeleteFail] = useState<boolean>(false);
    const [editItem, setEditItem] = useState<boolean>(false);

    const deleteItem = (reference: DocumentReference<Product>) => {
        ProductData.delete(reference)
            .then(() => {
                if (deletedDispatcher) deletedDispatcher(true);
                setItemDeleteFail(false);
            })
            .catch(() => {
                setItemDeleteFail(true);
            });
    };

    return (
        <>
            <Card className="item">
                <Image src="https://i.ibb.co/Z8mKr4f/boxclipart.png" />
                <Card.Body>
                    <Card.Title>{product.data.name}</Card.Title>
                    <Card.Subtitle>{product.data.category}</Card.Subtitle>
                    <br />
                    <Button
                        variant="success"
                        onClick={() => addToCart(product.data, 1, null)}
                    >
                        Add to Cart
                    </Button>
                    {admin ? (
                        <>
                            <Toast
                                bg="danger"
                                onClose={() => setItemDeleteFail(false)}
                                show={itemDeleteFail}
                                delay={5000}
                                autohide
                                className="w-100 my-2"
                            >
                                <Toast.Body>Failed to delete item</Toast.Body>
                            </Toast>
                            <br />
                            <Button onClick={() => setEditItem(true)}>
                                Edit Item
                            </Button>
                            <br />
                            <Button
                                onClick={() => deleteItem(product.reference)}
                                variant="danger"
                            >
                                Delete Item
                            </Button>
                        </>
                    ) : (
                        <></>
                    )}
                </Card.Body>
            </Card>
            <Modal show={editItem} onHide={() => setEditItem(false)}>
                <Modal.Header>
                    <Modal.Title>Edit Item</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ProductFormComponent
                        product={product}
                        completedDispatcher={(success) => {
                            if (editedDispatcher) editedDispatcher(success);
                            setEditItem(false);
                        }}
                    />
                </Modal.Body>
            </Modal>
        </>
    );
}
