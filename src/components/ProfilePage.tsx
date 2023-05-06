import React, { useState, useEffect } from "react";

import { Button, Container, Form, Alert } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import {
    useLoggedInUser,
    useLoggedInUserAccount
} from "../firebase/firebase_auth";
import {
    UserAccount,
    UserAddress,
    UserPayment,
    saveAccount,
    firstAddress,
    firstPayment
} from "../interface/account";

export const ProfilePage = (): JSX.Element => {
    const user = useLoggedInUser();
    const account: UserAccount | null = useLoggedInUserAccount();

    const [address, setAddress] = useState<UserAddress>(firstAddress(account));
    const [payment, setPayment] = useState<UserPayment>(firstPayment(account));

    const [failed, setFailed] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);

    useEffect(() => {
        setAddress(firstAddress(account));
        setPayment(firstPayment(account));
    }, [account]);

    return (
        <Container fluid className="flex-grow-1 ez-bg">
            <Container className="h-100 side-shadow">
                <h1 className="p-4">Your Profile</h1>
                <hr></hr>
                {!user ? (
                    <Alert variant="danger">You are not logged in!</Alert>
                ) : (
                    <Container fluid>
                        <Form>
                            <Row className="mb-3">
                                <h4 className="pb-2">Email</h4>
                                <Form.Group controlId="formEmail">
                                    <Form.Control
                                        type="email"
                                        placeholder={
                                            user && user.email
                                                ? user.email
                                                : " "
                                        }
                                        readOnly
                                        className="w-25"
                                    />
                                </Form.Group>
                            </Row>
                            <Row>
                                <Col>
                                    <h4 className="pb-2">Payment</h4>
                                    <Form.Group
                                        className="mb-3"
                                        controlId="formCardholder"
                                    >
                                        <Form.Label>Name on Card</Form.Label>
                                        <Form.Control
                                            placeholder="Cardholder Name"
                                            value={payment.cardholderName}
                                            onChange={(e) =>
                                                setPayment({
                                                    ...payment,
                                                    cardholderName:
                                                        e.target.value
                                                })
                                            }
                                        />
                                    </Form.Group>

                                    <Row>
                                        <Col>
                                            <Form.Label>Card Number</Form.Label>
                                            <Form.Control
                                                placeholder="Card Number"
                                                value={payment.cardNumber}
                                                onChange={(e) =>
                                                    setPayment({
                                                        ...payment,
                                                        cardNumber:
                                                            e.target.value
                                                    })
                                                }
                                            />
                                        </Col>
                                        <Col xs={4}>
                                            <Form.Label>Expiration</Form.Label>
                                            <Container
                                                fluid
                                                className="d-flex p-0 m-0"
                                            >
                                                <Form.Control
                                                    type="number"
                                                    placeholder="MM"
                                                    className="me-2"
                                                    value={
                                                        payment.expiration.getMonth() +
                                                        1
                                                    }
                                                    onChange={(e) => {
                                                        const newDate =
                                                            new Date(
                                                                payment.expiration.getFullYear(),
                                                                parseInt(
                                                                    e.target
                                                                        .value
                                                                ) - 1,
                                                                1
                                                            );
                                                        setPayment({
                                                            ...payment,
                                                            expiration: newDate
                                                        });
                                                    }}
                                                />
                                                <Form.Control
                                                    type="number"
                                                    placeholder="YYYY"
                                                    value={payment.expiration.getFullYear()}
                                                    onChange={(e) => {
                                                        const newDate =
                                                            new Date(
                                                                parseInt(
                                                                    e.target
                                                                        .value
                                                                ),
                                                                payment.expiration.getMonth(),
                                                                1
                                                            );
                                                        setPayment({
                                                            ...payment,
                                                            expiration: newDate
                                                        });
                                                    }}
                                                />
                                            </Container>
                                        </Col>
                                        <Col xs={2}>
                                            <Form.Label>CVV</Form.Label>
                                            <Form.Control
                                                placeholder="CVV"
                                                value={payment.cvv}
                                                onChange={(e) =>
                                                    setPayment({
                                                        ...payment,
                                                        cvv: e.target.value
                                                    })
                                                }
                                            />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={4}>
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
                                </Col>
                                <Col>
                                    <h4 className="pb-2">Shipping</h4>
                                    <Form.Group
                                        className="mb-3"
                                        controlId="formAddress"
                                    >
                                        <Form.Label>Address</Form.Label>
                                        <Form.Control
                                            placeholder="Street Address"
                                            value={address.addr1}
                                            onChange={(e) =>
                                                setAddress({
                                                    ...address,
                                                    addr1: e.target.value
                                                })
                                            }
                                        />
                                    </Form.Group>

                                    <Form.Group
                                        className="mb-3"
                                        controlId="formAddress2"
                                    >
                                        <Form.Label>Address 2</Form.Label>
                                        <Form.Control
                                            placeholder="Apartment, studio, or floor"
                                            value={
                                                !address.addr2
                                                    ? ""
                                                    : address.addr2
                                            }
                                            onChange={(e) =>
                                                setAddress({
                                                    ...address,
                                                    addr2: e.target.value
                                                })
                                            }
                                        />
                                    </Form.Group>

                                    <Row className="mb-3">
                                        <Form.Label>City/State/Zip</Form.Label>
                                        <Col xs={6}>
                                            <Form.Control
                                                placeholder="City"
                                                value={address.city}
                                                onChange={(e) =>
                                                    setAddress({
                                                        ...address,
                                                        city: e.target.value
                                                    })
                                                }
                                            />
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                placeholder="State"
                                                value={address.state}
                                                onChange={(e) =>
                                                    setAddress({
                                                        ...address,
                                                        state: e.target.value
                                                    })
                                                }
                                            />
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                placeholder="Zip"
                                                value={address.zip}
                                                onChange={(e) =>
                                                    setAddress({
                                                        ...address,
                                                        zip: e.target.value
                                                    })
                                                }
                                            />
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                            <div className="col text-center pt-2 d-grid gap-2">
                                <Button
                                    variant="primary"
                                    onClick={() =>
                                        saveAccount(
                                            user,
                                            address,
                                            payment,
                                            true,
                                            true
                                        )
                                            .then(() => setSuccess(true))
                                            .catch(() => setFailed(true))
                                    }
                                >
                                    Save
                                </Button>
                            </div>
                            <Alert
                                className="mt-2"
                                show={failed}
                                onClose={() => setFailed(false)}
                                variant="danger"
                                dismissible
                            >
                                <Alert.Heading>Failed!</Alert.Heading>
                                <p>Could not save information!</p>
                            </Alert>
                            <Alert
                                className="mt-2"
                                show={success}
                                onClose={() => setSuccess(false)}
                                variant="success"
                                dismissible
                            >
                                <Alert.Heading>Success!</Alert.Heading>
                                <p>Updated your information!</p>
                            </Alert>
                        </Form>
                    </Container>
                )}
            </Container>
        </Container>
    );
};
