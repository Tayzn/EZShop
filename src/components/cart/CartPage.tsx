import React, { useState, useEffect } from "react";

import { Container, Col, Button } from "react-bootstrap";
import { Cart, cart_HookCartState, getCart } from "../../interface/cart";

import { CartItemDisplay } from "./CartItemDisplay";
import { ShippingForm } from "./ShippingForm";

export const CartPage = (): JSX.Element => {
    const [cart, setCart] = useState<Cart>(getCart());
    const [shippingPrice, setShippingPrice] = useState<number>(5.99);
    const [total, setTotal] = useState<number>(0.0);
    useEffect(() => cart_HookCartState(setCart), []);
    useEffect(() => setTotal(shippingPrice), [shippingPrice]);
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
                            <h2>Total: ${total}</h2>
                            <hr></hr>
                            <div className="mt-4">
                                <ShippingForm
                                    shippingPrice={shippingPrice}
                                    setShippingPrice={setShippingPrice}
                                />
                            </div>
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
