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
        //this function
        const updated = variant.split(",");
        setVariants(Object.assign(variants, { [group]: updated }));
    }
    function removeVariant(group: string) {
        //const updated = [...variants[group]].filter((v) => v !== variant);
        const temp = {};
        Object.entries(variants).map(([group1]) => {
            if (group1 !== group) {
                console.log(group1);
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
            <p key="group">
                {group} - {variant.join(",")}
                <Button
                    onClick={() => {
                        setEditing(true);
                        setOldEditGroup(group);
                        setEditGroup(group);
                        setOldEditVariant(variant.join(","));
                        setEditVariant(variant.join(","));
                    }}
                >
                    Edit
                </Button>
                <Button
                    onClick={() => {
                        removeVariant(group);
                    }}
                >
                    Delete
                </Button>
            </p>
        ));
    }
    function mapVariants() {
        return (
            <div>
                {mapOptions()}
                <Form.Control
                    type="text"
                    value={editGroup}
                    placeholder="edit group"
                    onChange={({ target }) => setEditGroup(target.value)}
                ></Form.Control>
                <Form.Control
                    type="text"
                    value={editVariant}
                    placeholder="edit variant"
                    onChange={({ target }) => setEditVariant(target.value)}
                ></Form.Control>
                <Button
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
                        setEditGroup("");
                        setEditVariant("");
                    }}
                >
                    Save
                </Button>
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
