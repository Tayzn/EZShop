import React from "react";

import { Modal, Container, Button, Form, Row, Col } from "react-bootstrap";

export const PaymentModal = ({
    confirmation,
    setConfirmation,
    submitOrder
}: {
    confirmation: boolean;
    setConfirmation: (newConfirmation: boolean) => void;
    submitOrder: () => void;
}): JSX.Element => {
    return (
        <Modal
            show={confirmation}
            centered
            onHide={() => setConfirmation(false)}
        >
            <Modal.Header closeButton>
                <h3>Confirm Payment Information</h3>
            </Modal.Header>
            <Modal.Body className="d-flex flex-column">
                <Container>
                    <Form>
                        <Row>
                            <Col>
                                <Form.Label>Cardholder</Form.Label>
                                <Form.Control placeholder="Name on card" />
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col>
                                <Form.Label>Card Number</Form.Label>
                                <Form.Control placeholder="0123 4444 5555 6666" />
                                <Form.Label>CVV</Form.Label>
                                <Form.Control placeholder="000" />
                            </Col>
                            <Col>
                                <Form.Label>Expiry</Form.Label>
                                <Form.Control placeholder="MM/YY" />
                            </Col>
                        </Row>
                    </Form>
                </Container>

                <Button variant="success" onClick={() => submitOrder()}>
                    Place Order
                </Button>
            </Modal.Body>
        </Modal>
    );
};
