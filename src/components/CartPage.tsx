import React, { useEffect, useState } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { Cart, cart_HookCartState, getCart } from "../interface/cart";

const ShippingForm = () => {
    const [shippingPrice, setShippingPrice] = useState<number | null>(null);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const deliveryOption = formData.get("deliveryOption") as string;
        let shippingPrice = 0;
        if (deliveryOption === "standard") {
            shippingPrice = 5.99;
        } else if (deliveryOption === "express") {
            shippingPrice = 9.99;
        }
        setShippingPrice(shippingPrice);
    };

    return (
        <Form onSubmit={handleSubmit}>
            <h2 className="mb-4">Shipping Information</h2>
            <div className="mb-4">
                <h4>Delivery Option</h4>
                <Row>
                    <Col>
                        <Form.Check
                            type="radio"
                            label="Standard Delivery"
                            name="deliveryOption"
                            value="standard"
                            id="standardDelivery"
                            required
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Check
                            type="radio"
                            label="Express Delivery"
                            name="deliveryOption"
                            value="express"
                            id="expressDelivery"
                        />
                    </Col>
                </Row>
            </div>
            <div className="mb-4">
                <h4>Shipping Address</h4>
                <Form.Label>
                    Enter your shipping address (e.g. 123 StName, CityName, USA
                    12345)
                </Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter your shipping address"
                    required
                />
            </div>
            {shippingPrice !== null && (
                <div className="mb-4">
                    <h4>Shipping Price</h4>
                    <p>${shippingPrice.toFixed(2)}</p>
                </div>
            )}
            <Button variant="primary" type="submit" href="#/confirmation">
                Complete Shipping Information
            </Button>
        </Form>
    );
};

export const CartPage = (): JSX.Element => {
    const [cart, setCart] = useState<Cart>(getCart());
    useEffect(() => cart_HookCartState(setCart), []);

    return (
        <Container fluid className="flex-grow-1 ez-bg">
            <Container className="h-100 side-shadow">
                <h1 className="p-4">Your Cart</h1>
                <hr />
                {cart.items.map((item, idx) => (
                    <p key={idx}>
                        {item.product.name} - x{item.quantity}
                    </p>
                ))}
                <div className="mt-4">
                    <ShippingForm />
                </div>
            </Container>
        </Container>
    );
};
