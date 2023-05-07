import React from "react";

import { Modal, Container, Button, Form, Row, Col } from "react-bootstrap";
import { UserPayment } from "../../interface/account";

export const PaymentModal = ({
    user,
    confirmation,
    setConfirmation,
    submitOrder,
    payment,
    setPayment,
    savePayment,
    setSavePayment
}: {
    user: boolean;
    confirmation: boolean;
    setConfirmation: (newConfirmation: boolean) => void;
    submitOrder: () => void;
    payment: UserPayment;
    setPayment: (newPayment: UserPayment) => void;
    savePayment: boolean;
    setSavePayment: (newSave: boolean) => void;
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
                                <Form.Control
                                    placeholder="Name on card"
                                    value={payment.cardholderName}
                                    onChange={(e) =>
                                        setPayment({
                                            ...payment,
                                            cardholderName: e.target.value
                                        })
                                    }
                                />
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col>
                                <Form.Label>Card Number</Form.Label>
                                <Form.Control
                                    placeholder="Card Number"
                                    value={payment.cardNumber}
                                    onChange={(e) =>
                                        setPayment({
                                            ...payment,
                                            cardNumber: e.target.value
                                        })
                                    }
                                />
                                <Form.Label>CVV</Form.Label>
                                <Form.Control
                                    placeholder="000"
                                    value={payment.cvv}
                                    onChange={(e) =>
                                        setPayment({
                                            ...payment,
                                            cvv: e.target.value
                                        })
                                    }
                                />
                            </Col>
                            <Col>
                                <Form.Label>Expiration</Form.Label>
                                <Container fluid className="d-flex p-0 m-0">
                                    <Form.Control
                                        className="me-2"
                                        placeholder="MM"
                                        type="number"
                                        value={
                                            payment.expiration.getMonth() + 1
                                        }
                                        onChange={(e) => {
                                            const newDate = new Date();
                                            newDate.setDate(1);
                                            newDate.setMonth(
                                                parseInt(e.target.value) - 1
                                            );
                                            newDate.setFullYear(
                                                payment.expiration.getFullYear()
                                            );
                                            setPayment({
                                                ...payment,
                                                expiration: newDate
                                            });
                                        }}
                                    />
                                    <Form.Control
                                        placeholder="YYYY"
                                        type="number"
                                        value={payment.expiration.getFullYear()}
                                        onChange={(e) => {
                                            const newDate = new Date();
                                            newDate.setDate(1);
                                            newDate.setMonth(
                                                payment.expiration.getMonth()
                                            );
                                            newDate.setFullYear(
                                                parseInt(e.target.value)
                                            );
                                            setPayment({
                                                ...payment,
                                                expiration: newDate
                                            });
                                        }}
                                    />
                                </Container>
                                <Form.Label>Zipcode</Form.Label>
                                <Form.Control
                                    placeholder="Zip"
                                    value={payment.zip}
                                    onChange={(e) =>
                                        setPayment({
                                            ...payment,
                                            zip: e.target.value
                                        })
                                    }
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                {user && (
                                    <Form.Check
                                        label="Save payment info for next time"
                                        id="save-payment-info"
                                        checked={savePayment}
                                        onChange={(e) =>
                                            setSavePayment(e.target.checked)
                                        }
                                    />
                                )}
                            </Col>
                        </Row>
                    </Form>
                </Container>

                <Button
                    variant="success"
                    onClick={() => submitOrder()}
                    disabled={
                        payment.cardholderName === "" ||
                        payment.cardNumber === "" ||
                        payment.cvv === "" ||
                        payment.zip === ""
                    }
                >
                    Place Order
                </Button>
            </Modal.Body>
        </Modal>
    );
};
