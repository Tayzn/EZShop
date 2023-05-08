import React from "react";
import { Modal, Form, Row, Col } from "react-bootstrap";
import { UserAddress } from "../../interface/account";

export const ViewShipping = ({
    shipView,
    setShipView,
    shipping
}: {
    shipView: boolean;
    setShipView: (newShipView: boolean) => void;
    shipping: UserAddress;
}) => {
    return (
        <Modal show={shipView} centered onHide={() => setShipView(false)}>
            <Modal.Header>
                <h2>Shipping Address</h2>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Row>
                        <Col className="d-flex">
                            <Form.Group
                                controlId="formAddress"
                                className="me-2"
                            >
                                <Form.Label>Street Address</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={shipping.addr1}
                                    readOnly
                                />
                            </Form.Group>
                            <Form.Group controlId="formAddress2">
                                <Form.Label>Second Address</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={
                                        !shipping.addr2 ? "" : shipping.addr2
                                    }
                                    readOnly
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="mt-2">
                        <Col className="d-flex">
                            <Form.Group controlId="formCity" className="me-2">
                                <Form.Label>City</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={shipping.city}
                                    readOnly
                                />
                            </Form.Group>
                            <Form.Group controlId="formState" className="me-2">
                                <Form.Label>State</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={shipping.state}
                                    readOnly
                                />
                            </Form.Group>
                            <Form.Group controlId="formCardZip">
                                <Form.Label>Zipcode</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={shipping.zip}
                                    readOnly
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                </Form>
            </Modal.Body>
        </Modal>
    );
};
