/**
 * Temporary data editor
 * merematt@udel.edu
 * 4/8/2023
 */

import React, { useEffect, useState } from "react";
import {
    Alert,
    Button,
    Card,
    FloatingLabel,
    Form,
    ListGroup,
    Modal,
    Spinner,
    Toast
} from "react-bootstrap";
import {
    ProductData,
    ReferencedObject,
    data_HookPromiseState
} from "../firebase/firebase_data";
import { Product } from "../interface/product";

export function TempDataComponent(): JSX.Element {
    const [products, setProducts] = useState<ReferencedObject<Product>[]>([]);
    const [loadError, setLoadError] = useState<boolean>(false);

    const [newItem, setNewItem] = useState<boolean>(false);
    const [name, setName] = useState<string>("");
    const [category, setCategory] = useState<string>("");
    const [stock, setStock] = useState<string>("");
    const [primaryVariants, setPrimaryVariants] = useState<string>("");
    const [secondaryVariants, setSecondaryVariants] = useState<string>("");

    const [itemCreating, setItemCreating] = useState<boolean>(false);
    const [itemCreateSuccess, setItemCreateSuccess] = useState<boolean>(false);
    const [itemCreateFail, setItemCreateFail] = useState<boolean>(false);

    // loading data is resource intensive so we should avoid doing it
    useEffect(
        () =>
            data_HookPromiseState(
                ProductData.list(),
                setProducts,
                setLoadError
            ),
        [itemCreateSuccess]
    );

    const createNewItem = () => {
        setItemCreating(true);
        ProductData.create({
            name: name,
            category: category,
            stock: parseInt(stock),
            primaryVariants: primaryVariants.split(","),
            secondaryVariants: secondaryVariants.split(",")
        })
            .then(() => {
                setNewItem(false);
                setItemCreateSuccess(true);
                setItemCreateFail(false);
            })
            .catch(() => setItemCreateFail(true))
            .finally(() => setItemCreating(false));
    };

    return (
        <div>
            <Toast
                bg="success"
                onClose={() => setItemCreateSuccess(false)}
                show={itemCreateSuccess}
                delay={10000}
                autohide
            >
                <Toast.Body>Successfully added item</Toast.Body>
            </Toast>
            <Toast
                onClose={() => setItemCreateFail(false)}
                show={itemCreateFail}
                delay={10000}
                autohide
            >
                <Toast.Body>Failed to add item</Toast.Body>
            </Toast>
            {loadError ? (
                <Alert variant="danger">Failed to load products</Alert>
            ) : (
                <>
                    {products.map((product) => (
                        <Card key={product.reference.id}>
                            <Card.Title>
                                {product.data.stock} * {product.data.name}
                            </Card.Title>
                            <Card.Subtitle>
                                {product.data.category}
                            </Card.Subtitle>
                            <ListGroup>
                                {product.data.primaryVariants?.map(
                                    (variant) => (
                                        <ListGroup.Item key={variant}>
                                            {variant}
                                        </ListGroup.Item>
                                    )
                                )}
                            </ListGroup>
                            <ListGroup>
                                {product.data.secondaryVariants?.map(
                                    (variant) => (
                                        <ListGroup.Item key={variant}>
                                            {variant}
                                        </ListGroup.Item>
                                    )
                                )}
                            </ListGroup>
                        </Card>
                    ))}
                </>
            )}
            <br />
            <Button onClick={() => setNewItem(true)}>New Item</Button>
            <Modal show={newItem} onHide={() => setNewItem(false)}>
                {itemCreateFail ? (
                    <Alert variant="danger">Failed to add item</Alert>
                ) : (
                    <></>
                )}
                <Modal.Header>
                    <Modal.Title>New Item</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FloatingLabel label="Name">
                        <Form.Control
                            type="text"
                            value={name}
                            onChange={({ target }) => setName(target.value)}
                        ></Form.Control>
                    </FloatingLabel>
                    <br />
                    <FloatingLabel label="Category">
                        <Form.Control
                            type="text"
                            value={category}
                            onChange={({ target }) => setCategory(target.value)}
                        ></Form.Control>
                    </FloatingLabel>
                    <br />
                    <FloatingLabel label="Stock">
                        <Form.Control
                            type="number"
                            value={stock}
                            onChange={({ target }) => setStock(target.value)}
                        ></Form.Control>
                    </FloatingLabel>
                    <br />
                    <FloatingLabel label="Primary Variants">
                        <Form.Control
                            type="text"
                            value={primaryVariants}
                            onChange={({ target }) =>
                                setPrimaryVariants(target.value)
                            }
                        ></Form.Control>
                    </FloatingLabel>
                    <Form.Text className="text-muted">
                        Seperate with commas
                    </Form.Text>
                    <br />
                    <FloatingLabel label="Secondary Variants">
                        <Form.Control
                            type="text"
                            value={secondaryVariants}
                            onChange={({ target }) =>
                                setSecondaryVariants(target.value)
                            }
                        ></Form.Control>
                    </FloatingLabel>
                    <Form.Text className="text-muted">
                        Seperate with commas
                    </Form.Text>
                    <br />
                    <Button
                        disabled={itemCreating}
                        variant="success"
                        onClick={createNewItem}
                    >
                        Create Item
                    </Button>
                    <Spinner
                        hidden={!itemCreating}
                        animation="border"
                    ></Spinner>
                </Modal.Body>
            </Modal>
        </div>
    );
}
