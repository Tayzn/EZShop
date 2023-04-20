/**
 * Product Display Component
 * merematt@udel.edu & nlago@udel.edu
 * 4/9/2023
 */

import React, { useState } from "react";
import { Product } from "../../interface/product";
import { ProductData, ReferencedObject } from "../../firebase/firebase_data";
import { Badge, Button, Card, Col, Form, Modal, Toast } from "react-bootstrap";
import { DocumentReference } from "firebase/firestore";
import { ProductFormComponent } from "./ProductFormComponent";
import { Image } from "react-bootstrap";
import { Container, Row } from "react-bootstrap";
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
    const [inspectItem, setInspectItem] = useState<boolean>(false);
    const [color, setColor] = useState("test");
    //const [orderQuantity, setMinPriceFilter] = useState<string>("0");
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
            <Card className="item" onClick={() => setInspectItem(true)}>
                <Image src="https://i.ibb.co/Z8mKr4f/boxclipart.png" />
                <Card.Title>
                    {product.data.stock} * {product.data.name}*
                    {product.data.price}
                </Card.Title>
                <Card.Subtitle>{product.data.category}</Card.Subtitle>
                <br />
                <div>
                    {product.data.variants?.map((variant) => (
                        <>
                            <Badge key={variant.name}>{variant.name}</Badge>
                            &nbsp;
                        </>
                    ))}
                </div>
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
            <Modal
                show={inspectItem}
                onHide={() => setInspectItem(false)}
                size="lg"
            >
                <Modal.Header>
                    <Modal.Title>{product.data.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <Row>
                            <Col>
                                <Image
                                    height="300px"
                                    width="300px"
                                    src="https://i.ibb.co/Z8mKr4f/boxclipart.png"
                                />
                            </Col>
                            <Col>
                                <Row>Price: ${product.data.price}</Row>
                                <p></p>
                                <Row>Stock: {product.data.stock}</Row>
                                <p></p>
                                <Row>
                                    options:
                                    <Form.Select
                                        value={color}
                                        onChange={(
                                            event: React.ChangeEvent<HTMLSelectElement>
                                        ) => setColor(event.target.value)}
                                    >
                                        {product.data.variants != null ? (
                                            product.data.variants?.map(
                                                (variant) => (
                                                    <option
                                                        key={variant.name}
                                                        value={variant.name}
                                                    >
                                                        {variant.name}
                                                    </option>
                                                )
                                            )
                                        ) : (
                                            <option
                                                value={"No primary Variants"}
                                            >
                                                {"No primary Variants"}
                                            </option>
                                        )}
                                    </Form.Select>
                                    <p></p>
                                </Row>
                            </Col>
                            <Row>
                                <Button
                                    variant="success"
                                    style={{
                                        width: "300px",
                                        marginLeft: "400px"
                                    }}
                                >
                                    Add to Cart
                                </Button>
                            </Row>
                        </Row>
                    </Container>
                </Modal.Body>
            </Modal>
        </>
    );
}
