import React from "react";

import { Button, Container, Form } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

export const ProfilePage = (): JSX.Element => {
    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        console.log(event.target);
        //const formDataObj = Object.fromEntries(formData.entries());
        //console.log(formDataObj);
    };

    return (
        <Container fluid className="flex-grow-1 ez-bg">
            <Container className="h-100 side-shadow">
                <h1 className="p-4">Your Profile</h1>
                <hr></hr>
                <Form>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                            />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                            />
                        </Form.Group>
                    </Row>
                    <hr></hr>

                    <Row>
                        <Col>
                            <h4 className="pb-2">Payment</h4>
                            <Form.Group
                                className="mb-3"
                                controlId="formCardholder"
                            >
                                <Form.Label>Name on Card</Form.Label>
                                <Form.Control placeholder="Dennis Assanis" />
                            </Form.Group>

                            <Row>
                                <Col>
                                    <Form.Label>Card Number</Form.Label>
                                    <Form.Control placeholder="0123 4444 5555 6666" />
                                </Col>
                                <Col sm={6} lg={2}>
                                    <Form.Label>Expiry</Form.Label>
                                    <Form.Control placeholder="00/23" />
                                </Col>
                                <Col sm={6} lg={2}>
                                    <Form.Label>CVV</Form.Label>
                                    <Form.Control placeholder="000" />
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
                                <Form.Control placeholder="1234 Main St" />
                            </Form.Group>

                            <Form.Group
                                className="mb-3"
                                controlId="formAddress2"
                            >
                                <Form.Label>Address 2</Form.Label>
                                <Form.Control placeholder="Apartment, studio, or floor" />
                            </Form.Group>

                            <Row className="mb-3">
                                <Form.Label>City/State/Zip</Form.Label>
                                <Col xs={6}>
                                    <Form.Control placeholder="City" />
                                </Col>
                                <Col>
                                    <Form.Control placeholder="State" />
                                </Col>
                                <Col>
                                    <Form.Control placeholder="Zip" />
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <div className="col text-center pt-2 d-grid gap-2">
                        <Button variant="primary" type="submit">
                            Save
                        </Button>
                    </div>
                </Form>
            </Container>
        </Container>
    );
};
