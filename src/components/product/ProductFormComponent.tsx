/**
 * Product Form
 * merematt@udel.edu
 * 4/9/2023
 */

import React, { useState } from "react";
import { Product, ProductVariants } from "../../interface/product";
import { ProductData, ReferencedObject } from "../../firebase/firebase_data";
import { Button, FloatingLabel, Form, Spinner, Toast } from "react-bootstrap";

/**
 * Form component for products
 * @param product The product to edit, a new product will be created if not provided
 */
export function ProductFormComponent({
    product,
    completedDispatcher
}: {
    product?: ReferencedObject<Product>;
    completedDispatcher?: React.Dispatch<React.SetStateAction<boolean>>;
}): JSX.Element {
    const [name, setName] = useState<string>(product?.data.name || "");
    const [category, setCategory] = useState<string>(
        product?.data.category || ""
    );
    const [description, setDescription] = useState<string>(
        product?.data.description || ""
    );
    const [price, setPrice] = useState<string>(
        product?.data.price.toString() || ""
    );
    const [stock, setStock] = useState<string>(
        product?.data.stock.toString() || ""
    );
    const [image, setImage] = useState<string>(
        product?.data.image.toString() || ""
    );
    const [variants, setVariants] = useState<ProductVariants>(
        product?.data.variants || {}
    );
    const [editGroup, setEditGroup] = useState<string>("");
    const [editVariant, setEditVariant] = useState<string>("");
    const [oldEditGroup, setOldEditGroup] = useState<string>("");
    const [oldEditVariant, setOldEditVariant] = useState<string>("");
    const [editing, setEditing] = useState<boolean>(false);
    const [databaseWorking, setDatabaseWorking] = useState<boolean>(false);
    const [operationFailure, setOperationFailure] = useState<boolean>(false);
    const [changingVariant, setChangingVariant] = useState<boolean>(true);
    const executeOperation = () => {
        setDatabaseWorking(true);

        let operation: Promise<ReferencedObject<Product>>;
        if (product) {
            product.data = {
                name: name,
                category: category,
                description: description,
                price: parseInt(price),
                stock: parseInt(stock),
                variants: variants,
                image: image
            };

            operation = ProductData.update(product);
        } else {
            operation = ProductData.create({
                name: name,
                category: category,
                description: description,
                price: parseInt(price),
                stock: parseInt(stock),
                variants: variants,
                image: image
            });
        }

        operation
            .then(() => {
                if (completedDispatcher) completedDispatcher(true);
                setOperationFailure(false);
            })
            .catch(() => setOperationFailure(true))
            .finally(() => setDatabaseWorking(false));
    };
    function addVariant(group: string, variant: string) {
        if (group !== "") {
            const updated = variant.split(",");
            setVariants(Object.assign(variants, { [group]: updated }));
        }
    }
    function removeVariant(group: string) {
        const temp = {};
        Object.entries(variants).map(([group1]) => {
            if (group1 !== group) {
                Object.assign(temp, { [group1]: variants[group1] });
            }
        });
        setVariants(temp);
        mapOptions();
    }
    function changeVariant(
        group: string,
        variant: string,
        newGroup: string,
        newVariant: string
    ) {
        removeVariant(group);
        addVariant(newGroup, newVariant);
    }
    function mapOptions() {
        return Object.entries(variants).map(([group, variant]) => (
            <p key="group" className="wrap">
                <hr></hr>
                {group} - {variant.join(",")}
                <div style={{ position: "absolute", right: "5px" }}>
                    <Button
                        style={{ position: "relative", right: "3px" }}
                        onClick={() => {
                            setEditing(true);
                            setOldEditGroup(group);
                            setEditGroup(group);
                            setOldEditVariant(variant.join(","));
                            setEditVariant(variant.join(","));
                            setChangingVariant(false);
                        }}
                    >
                        Edit
                    </Button>
                    <Button
                        variant="danger"
                        onClick={() => {
                            removeVariant(group);
                        }}
                    >
                        Delete
                    </Button>
                </div>
            </p>
        ));
    }
    function mapVariants() {
        return (
            <div>
                {mapOptions()}
                <div className="wrap" hidden={changingVariant}>
                    <FloatingLabel
                        style={{ width: "150px" }}
                        label="Variant Type"
                    >
                        <Form.Control
                            type="text"
                            value={editGroup}
                            onChange={({ target }) =>
                                setEditGroup(target.value)
                            }
                        ></Form.Control>
                    </FloatingLabel>
                    <span style={{ marginLeft: "15px" }}>-</span>
                    <FloatingLabel
                        label="Variant Options"
                        style={{
                            width: "200px",
                            position: "relative",
                            left: "15px"
                        }}
                    >
                        <Form.Control
                            type="text"
                            value={editVariant}
                            onChange={({ target }) =>
                                setEditVariant(target.value)
                            }
                        ></Form.Control>
                    </FloatingLabel>
                    <Button
                        style={{ position: "relative", left: "25px" }}
                        onClick={() => {
                            if (editing) {
                                changeVariant(
                                    oldEditGroup,
                                    oldEditVariant,
                                    editGroup,
                                    editVariant
                                );
                                setEditing(false);
                                setOldEditGroup("");
                                setOldEditVariant("");
                            } else {
                                addVariant(editGroup, editVariant);
                            }
                            setChangingVariant(true);
                            setEditGroup("");
                            setEditVariant("");
                        }}
                    >
                        Save
                    </Button>
                </div>
                <p></p>
                <Button
                    hidden={!changingVariant}
                    variant="primary"
                    style={{
                        borderRadius: "60px",
                        backgroundColor: "#198754",
                        borderWidth: "0px"
                    }}
                    onClick={() => setChangingVariant(false)}
                >
                    +
                </Button>
                <p></p>
            </div>
        );
    }
    return (
        <div>
            <Toast
                bg="danger"
                onClose={() => setOperationFailure(false)}
                show={operationFailure}
                delay={5000}
                autohide
                className="w-100 mb-2"
            >
                <Toast.Body>An error occurred</Toast.Body>
            </Toast>
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
            <FloatingLabel label="Description">
                <Form.Control
                    type="text"
                    value={description}
                    onChange={({ target }) => setDescription(target.value)}
                ></Form.Control>
            </FloatingLabel>
            <br />
            <FloatingLabel label="Price">
                <Form.Control
                    type="number"
                    value={price}
                    onChange={({ target }) => setPrice(target.value)}
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
            <FloatingLabel label="Image URL">
                <Form.Control
                    type="text"
                    value={image}
                    onChange={({ target }) => setImage(target.value)}
                ></Form.Control>
            </FloatingLabel>
            <br />
            <>Variants:</>
            {mapVariants()}
            <Button
                disabled={databaseWorking}
                variant="success"
                onClick={executeOperation}
            >
                {product ? "Save Item" : "Create Item"}
            </Button>
            <Spinner hidden={!databaseWorking} animation="border"></Spinner>
        </div>
    );
}
