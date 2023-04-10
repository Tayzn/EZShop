import React from "react";

import { Container } from "react-bootstrap";

export const Cart = (): JSX.Element => {
    return (
        <Container fluid className="flex-grow-1 ez-bg">
            <Container className="h-100 side-shadow">
                <h1 className="p-4">Your Cart</h1>
                <hr></hr>
            </Container>
        </Container>
    );
};
