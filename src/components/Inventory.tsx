import React from "react";

import { Container, Row } from "react-bootstrap";

import { Filter } from "./Filter";
import { ProductDisplayGrid } from "./product/ProductDisplayGrid";

export const Inventory = (): JSX.Element => {
    return (
        <Container className="h-75 side-shadow">
            <Container className="h-100">
                <Row>
                    <h1>Catalog</h1>
                    <Filter />
                    <hr></hr>
                </Row>
                <Row className="overflow-y-scroll h-75">
                    <ProductDisplayGrid />
                </Row>
            </Container>
        </Container>
    );
};
