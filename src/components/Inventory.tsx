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
        <Container fluid="lg" className="side-shadow overflow-y-visible">
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
            <Row className="overflow-y-visible pb-3">
                <ProductDisplayGrid
                    category={category}
                    isInStock={isInStock}
                    backorder={backorder}
                />
            </Row>
        </Container>
    );
};
