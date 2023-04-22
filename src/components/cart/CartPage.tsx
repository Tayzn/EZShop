import React, { useState, useEffect } from "react";

import { Container, Col, Button } from "react-bootstrap";
import { Cart, cart_HookCartState, getCart } from "../../interface/cart";

import { CartItemDisplay } from "./CartItemDisplay";

export const CartPage = (): JSX.Element => {
    const [cart, setCart] = useState<Cart>(getCart());
    useEffect(() => cart_HookCartState(setCart), []);
    return (
        <Container fluid className="flex-grow-1 ez-bg">
            <Container className="h-100 side-shadow">
                <h1 className="p-4">Your Cart</h1>
                <hr></hr>
                <Container className="d-flex flex-row">
                    <Col xs={8}>
                        {cart.items.map((item, idx) => (
                            <CartItemDisplay key={idx} item={item} />
                        ))}
                    </Col>
                    <Col xs={1}>
                        <></>
                    </Col>
                    <Col>
                        <Container
                            className="p-3"
                            style={{ backgroundColor: "#e6e6e6" }}
                        >
                            <h2>Total: $0.00</h2>
                            <hr></hr>
                            <Button variant="success" size="lg">
                                Payment »
                            </Button>
                        </Container>
                    </Col>
                </Container>
            </Container>
        </Container>
    );
};
