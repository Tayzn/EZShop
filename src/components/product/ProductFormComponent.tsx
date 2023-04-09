/**
 * Product Form
 * merematt@udel.edu
 * 4/9/2023
 */

import React, { useState } from "react";
import { Product } from "../../interface/product";
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
    const [stock, setStock] = useState<string>(
        product?.data.stock.toString() || ""
    );
    const [primaryVariants, setPrimaryVariants] = useState<string>(
        product?.data.primaryVariants?.join(",") || ""
    );
    const [secondaryVariants, setSecondaryVariants] = useState<string>(
        product?.data.secondaryVariants?.join(",") || ""
    );

    const [databaseWorking, setDatabaseWorking] = useState<boolean>(false);
    const [operationFailure, setOperationFailure] = useState<boolean>(false);

    const executeOperation = () => {
        setDatabaseWorking(true);

        let operation: Promise<ReferencedObject<Product>>;

        if (product) {
            product.data = {
                name: name,
                category: category,
                stock: parseInt(stock),
                primaryVariants: primaryVariants.split(","),
                secondaryVariants: secondaryVariants.split(",")
            };

            operation = ProductData.update(product);
        } else {
            operation = ProductData.create({
                name: name,
                category: category,
                stock: parseInt(stock),
                primaryVariants: primaryVariants.split(","),
                secondaryVariants: secondaryVariants.split(",")
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
                    onChange={({ target }) => setPrimaryVariants(target.value)}
                ></Form.Control>
            </FloatingLabel>
            <Form.Text className="text-muted">Seperate with commas</Form.Text>
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
            <Form.Text className="text-muted">Seperate with commas</Form.Text>
            <br />
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
