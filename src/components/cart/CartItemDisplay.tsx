import React from "react";

import { Container, Image, Col, Row, Button } from "react-bootstrap";

import {
    CartItem,
    updateCartQuantity,
    removeFromCart
} from "../../interface/cart";

const displayUrl = "https://i.ibb.co/w4v8kkx/ez-logo-background-128x128.png";

export const CartItemDisplay = ({ item }: { item: CartItem }) => {
    const incrementQuantity = () => {
        updateCartQuantity(item, item.quantity + 1);
    };

    const decrementQuantity = () => {
        if (item.quantity - 1 <= 0) {
            removeFromCart(item);
        } else {
            updateCartQuantity(item, item.quantity - 1);
        }
    };

    return (
        <>
            <Container className="d-flex flex-row">
                <Col xs={2}>
                    <Image fluid thumbnail src={displayUrl} />
                </Col>
                <Col className="d-flex flex-row mx-3">
                    <Col xs={11}>
                        <Row>
                            <h3>{item.product.name}</h3>
                        </Row>
                        <Row>
                            <Container>
                                <h6>Quantity</h6>
                                <Button
                                    variant="success"
                                    size="sm"
                                    onClick={() => incrementQuantity()}
                                >
                                    +
                                </Button>
                                <span> {item.quantity} </span>
                                <Button
                                    variant="danger"
                                    size="sm"
                                    onClick={() => decrementQuantity()}
                                >
                                    -
                                </Button>
                            </Container>
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
