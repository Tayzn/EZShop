import React, { useEffect, useState } from "react";
import { Container, Button, Col } from "react-bootstrap";
import { CartItemDisplay } from "./cart/CartItemDisplay";
import { useLocation } from "react-router-dom";
import { Cart, CartItem, cart_HookCartState, getCart } from "../interface/cart";

export const ConfirmationPage = (): JSX.Element => {
    const [cart, setCart] = useState<Cart>(getCart());
    useEffect(() => cart_HookCartState(setCart), []);
    const location = useLocation();
    const cartItems = location.state?.cartItems || [];

    return (
        <Container fluid style={{ height: "90%" }}>
            <h1
                style={{
                    fontFamily: "Arial",
                    fontSize: "3rem",
                    marginBottom: "2rem"
                }}
            >
                Order Placed!
            </h1>
            <Col xs={8}>
                <h4>Items in Cart</h4>
                {cartItems.map((item: CartItem, idx: number) => (
                    <CartItemDisplay key={idx} item={item} />
                ))}
            </Col>
            <Button
                variant="success"
                type="submit"
                className="confirmButton"
                href="#/"
                style={{ marginTop: "2rem" }}
            >
                Return Home
            </Button>
        </Container>
    );
};
