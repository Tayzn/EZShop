import React from "react";

import { Container } from "react-bootstrap";
import { getCart } from "../interface/cart";

export const CartPage = (): JSX.Element => {
    return (
        <Container fluid className="flex-grow-1 ez-bg">
            <Container className="h-100 side-shadow">
                <h1 className="p-4">Your Cart</h1>
                <hr></hr>
                {getCart()?.items.map((item, idx) => (
                    <p key={idx}>
                        {item.product.name} - x{item.quantity}
                    </p>
                ))}
            </Container>
        </Container>
    );
};
