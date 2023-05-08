import React from "react";
import { Modal, Form, Row, Col } from "react-bootstrap";
import { UserPayment } from "../../interface/account";
import { Timestamp } from "firebase/firestore";

export const ViewPayment = ({
    paymentView,
    setPaymentView,
    payment
}: {
    paymentView: boolean;
    setPaymentView: (newPaymentView: boolean) => void;
    payment: UserPayment;
}) => {
    return (
        <Modal show={paymentView} centered onHide={() => setPaymentView(false)}>
            <Modal.Header>
                <h2>Order Payment</h2>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Row>
                        <Col className="d-flex">
                            <Form.Group
                                controlId="formCardholder"
                                className="me-2"
                            >
                                <Form.Label>Cardholder Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={payment.cardholderName}
                                    readOnly
                                />
                            </Form.Group>
                            <Form.Group controlId="formCardNumber">
                                <Form.Label>Card Number</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={payment.cardNumber}
                                    readOnly
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="mt-2">
                        <Col className="d-flex">
                            <Form.Group
                                controlId="formCardCVV"
                                className="me-2"
                            >
                                <Form.Label>CVV</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={payment.cvv}
                                    readOnly
                                />
                            </Form.Group>
                            <Form.Group
                                controlId="formCardExpiration"
                                className="me-2"
                            >
                                <Form.Label>Expiration</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={
                                        payment.expiration instanceof Timestamp
                                            ? `${
                                                  payment.expiration
                                                      .toDate()
                                                      .getMonth() + 1
                                              }/${payment.expiration
                                                  .toDate()
                                                  .getFullYear()}`
                                            : `${
                                                  payment.expiration.getMonth() +
                                                  1
                                              }/${payment.expiration.getFullYear()}`
                                    }
                                    readOnly
                                />
                            </Form.Group>
                            <Form.Group controlId="formCardZip">
                                <Form.Label>Zipcode</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={payment.zip}
                                    readOnly
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <h3>PAID</h3>
            </Modal.Footer>
        </Modal>
    );
};
