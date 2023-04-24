import React, { useState, useEffect } from "react";
import { Container, Image, Button, Col } from "react-bootstrap";
import { CartItemDisplay } from "./cart/CartItemDisplay";
import { Cart, getCart } from "../interface/cart";

export const ConfirmationPage = (): JSX.Element => {
    const [cart, setCart] = useState<Cart>(getCart());

    return (
        <Container fluid style={{ height: "90%" }}>
            <h1 className="confirm">Order Placed!</h1>
            <h2 className="items">items here</h2>

            <Button
                variant="success"
                type="submit"
                className="confirmButton"
                href="#/"
            >
                Return Home
            </Button>
            <Col xs={8}>
                {cart.items.map((item, idx) => (
                    <CartItemDisplay key={idx} item={item} />
                ))}
            </Col>
        </Container>
    );
};
