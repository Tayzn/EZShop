import React, { useState } from "react";
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
    const [cardholderTouched, setCardholderTouched] = useState(false);
    const [cardNumberTouched, setCardNumberTouched] = useState(false);
    const [cvvTouched, setCvvTouched] = useState(false);
    const [zipTouched, setZipTouched] = useState(false);
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
                        <Row className="mb-1">
                            <Col>
                                <Form.Label>Cardholder</Form.Label>
                                <Form.Control
                                    placeholder="Name on card"
                                    value={payment.cardholderName}
                                    pattern="^[a-zA-Z\s-]*$"
                                    title="Cardholder name can only contain letters, spaces, and hyphens."
                                    isInvalid={
                                        cardholderTouched &&
                                        !payment.cardholderName.match(
                                            /^[a-zA-Z\s-]*$/
                                        )
                                    }
                                    onChange={(e) => {
                                        setPayment({
                                            ...payment,
                                            cardholderName: e.target.value
                                        });
                                        setCardholderTouched(true);
                                    }}
                                />
                                <Form.Control.Feedback type="invalid">
                                    This can only contain letters, spaces, and
                                    hyphens.
                                </Form.Control.Feedback>
                            </Col>
                            <Col>
                                <Form.Label>Card Number</Form.Label>
                                <Form.Control
                                    placeholder="Card Number"
                                    value={payment.cardNumber}
                                    pattern="^\d{12,19}$"
                                    title="Card number must be between 12 and 19 digits."
                                    isInvalid={
                                        cardNumberTouched &&
                                        !payment.cardNumber.match(/^\d{12,19}$/)
                                    }
                                    onChange={(e) => {
                                        setPayment({
                                            ...payment,
                                            cardNumber: e.target.value
                                        });
                                        setCardNumberTouched(true);
                                    }}
                                />
                                <Form.Control.Feedback type="invalid">
                                    This must be between 12 and 19 digits.
                                </Form.Control.Feedback>
                            </Col>
                        </Row>
                        <Row className="mb-3 mt-3">
                            <Col xs={3}>
                                <Form.Label>CVV</Form.Label>
                                <Form.Control
                                    placeholder="000"
                                    value={payment.cvv}
                                    pattern="^\d{3,4}$"
                                    title="CVV must be 3 or 4 digits."
                                    isInvalid={
                                        cvvTouched &&
                                        !payment.cvv.match(/^\d{3,4}$/)
                                    }
                                    onChange={(e) => {
                                        setPayment({
                                            ...payment,
                                            cvv: e.target.value
                                        });
                                        setCvvTouched(true);
                                    }}
                                />
                                <Form.Control.Feedback type="invalid">
                                    This must be 3 or 4 digits.
                                </Form.Control.Feedback>
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
                                        min={1}
                                        max={12}
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
                                        min={new Date().getFullYear()}
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
                            </Col>
                            <Col xs={4}>
                                <Form.Label>Zipcode</Form.Label>
                                <Form.Control
                                    placeholder="Zip"
                                    value={payment.zip}
                                    pattern="^\d{5}$"
                                    title="Zipcode must be 5 digits."
                                    isInvalid={
                                        zipTouched &&
                                        !payment.zip.match(/^\d{5}$/)
                                    }
                                    onChange={(e) => {
                                        setPayment({
                                            ...payment,
                                            zip: e.target.value
                                        });
                                        setZipTouched(true);
                                    }}
                                />
                                <Form.Control.Feedback type="invalid">
                                    This must be 5 digits.
                                </Form.Control.Feedback>
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
                        payment.zip === "" ||
                        !payment.cardholderName.match(/^[a-zA-Z\s]*$/) ||
                        !payment.cardNumber.match(/^\d{12,19}$/) ||
                        !payment.cvv.match(/^\d{3,4}$/) ||
                        !payment.zip.match(/^\d{5}(-\d{4})?$/)
                    }
                >
                    Submit Order
                </Button>
            </Modal.Body>
        </Modal>
    );
};
