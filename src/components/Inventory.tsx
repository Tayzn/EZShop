import React, { useState } from "react";
import { Container, Row } from "react-bootstrap";
import { Filter } from "./Filter";
import { ProductDisplayGrid } from "./product/ProductDisplayGrid";

export interface propData {
    category: string;
    isInStock: boolean;
    backorder: boolean;
    setCategory: (newCategory: string) => void;
    setBackorder: (newback: boolean) => void;
    setIsInStock: (newstock: boolean) => void;
}
export const Inventory = (): JSX.Element => {
    const [category, setCategory] = useState("any");
    const [isInStock, setIsInStock] = useState(true);
    const [backorder, setBackorder] = useState(false);
    return (
        <Container className="h-75 side-shadow">
            <Container className="h-100">
                <Row>
                    <h1>Catalog</h1>
                    <Filter
                        setBackorder={setBackorder}
                        setIsInStock={setIsInStock}
                        setCategory={setCategory}
                        category={category}
                        isInStock={isInStock}
                        backorder={backorder}
                    />
                    <hr></hr>
                </Row>
                <Row className="overflow-y-scroll h-75">
                    <ProductDisplayGrid
                        category={category}
                        isInStock={isInStock}
                        backorder={backorder}
                    />
                </Row>
            </Container>
        </Container>
    );
};
