import React, { useState } from "react";

import { Container, Image, Col, Row } from "react-bootstrap";

import { CartItem } from "../../interface/cart";

const displayUrl = "https://i.ibb.co/w4v8kkx/ez-logo-background-128x128.png";

export const CartItemDisplay = ({ item }: { item: CartItem }) => {
    const [quantity, setQuantity] = useState<number>(item.quantity);

    const updateQuantity = (newAmount: number) => {
        setQuantity(newAmount);
        item.quantity = newAmount;
    };

    return (
        <>
            <Container className="d-flex flex-row">
                <Col xs={2}>
                    <Image fluid thumbnail src={displayUrl} />
                </Col>
                <Col className="d-flex flex-row mx-3">
                    <Col xs={11} className="d-flex flex-column">
                        <Row>
                            <h3>
                                {item.product.name} - x{quantity}
                            </h3>
                        </Row>
                        <Row className="d-flex flex-row">
                            <p>Test1</p>
                            <p>Test2</p>
                        </Row>
                    </Col>
                    <Col>
                        <h4>${item.product.price * item.quantity}</h4>
                    </Col>
                </Col>
            </Container>
            <hr></hr>
        </>
    );
};
