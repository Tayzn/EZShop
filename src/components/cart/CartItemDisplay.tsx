import React from "react";

import { Container, Image, Col, Row } from "react-bootstrap";

import { CartItem } from "../../interface/cart";

export const CartItemDisplay = ({ item }: { item: CartItem }) => {
    return (
        <>
            <Container className="d-flex flex-row">
                <Col xs={2}>
                    <Image fluid thumbnail src={item.product.image} />
                </Col>
                <Col className="d-flex flex-row mx-3">
                    <Col xs={11} className="d-flex flex-column">
                        <Row>
                            <h3>
                                {item.product.name} - x{item.quantity}
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