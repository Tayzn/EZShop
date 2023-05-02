import React from "react";

import { Container, Image, Col, Row, Ratio } from "react-bootstrap";

import { CartItem } from "../../interface/cart";

export const BasicDisplayCard = ({ item }: { item: CartItem }) => {
    return (
        <>
            <Container className="d-flex flex-row">
                <Col xs={2}>
                    <Ratio aspectRatio={"1x1"}>
                        <Container
                            fluid
                            className="d-flex align-items-center justify-content-center overflow-hidden"
                        >
                            <Image fluid src={item.product.image} />
                        </Container>
                    </Ratio>
                </Col>
                <Col className="d-flex flex-row mx-3 align-items-center">
                    <Col className="d-flex flex-column align-items-start">
                        <Row className="mb-0 pb-0">
                            <h3 className="mb-0 pb-0">{item.product.name}</h3>
                        </Row>
                    </Col>
                    <Col className="d-flex flex-column align-items-end">
                        <Row className="mb-auto text-end">
                            <h4 className="mb-0">
                                ${item.product.price * item.quantity}{" "}
                            </h4>
                            <h6>
                                ${item.product.price}/pc x{item.quantity}
                            </h6>
                        </Row>
                    </Col>
                </Col>
            </Container>
            <hr></hr>
        </>
    );
};
