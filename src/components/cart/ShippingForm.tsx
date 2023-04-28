import React from "react";
import { Col, Form, Row } from "react-bootstrap";

export const ShippingForm = ({
    shippingPrice,
    setShippingPrice
}: {
    shippingPrice: number;
    setShippingPrice: (newNumber: number) => void;
}): JSX.Element => {
    return (
        <Form>
            <h2 className="mb-4" style={{ marginBottom: "1rem" }}>
                Shipping
            </h2>
            <div className="mb-4" style={{ marginTop: "1.5rem" }}>
                <h4>Delivery Option</h4>
                <Row>
                    <Col>
                        <Form.Check
                            type="radio"
                            label="Standard Delivery - $5.99"
                            name="deliveryOption"
                            value="5.99"
                            id="standardDelivery"
                            checked={shippingPrice == 5.99}
                            onChange={(e) =>
                                setShippingPrice(parseFloat(e.target.value))
                            }
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Check
                            type="radio"
                            label="Express Delivery - $9.99"
                            name="deliveryOption"
                            value="9.99"
                            id="expressDelivery"
                            checked={shippingPrice == 9.99}
                            onChange={(e) =>
                                setShippingPrice(parseFloat(e.target.value))
                            }
                        />
                    </Col>
                </Row>
            </div>
            <div className="mb-4">
                <h4 style={{ marginBottom: "1rem" }}>Shipping Address</h4>
                <Form.Group
                    as={Row}
                    controlId="formStreetAddress"
                    className="mb-3"
                >
                    <Col sm={12}>
                        <Form.Control
                            type="text"
                            placeholder="Street Address"
                            required
                        />
                    </Col>
                </Form.Group>

                <Form.Group
                    as={Row}
                    controlId="formCity"
                    className="mb-3"
                    style={{ marginBottom: "0px" }}
                >
                    <Col sm={12}>
                        <Form.Control
                            type="text"
                            placeholder="Town/City"
                            required
                        />
                    </Col>
                </Form.Group>

                <Form.Group
                    as={Row}
                    controlId="formState"
                    className="mb-3"
                    style={{ marginBottom: "0px" }}
                >
                    <Col sm={12}>
                        <Form.Control
                            type="text"
                            placeholder="State/Province/Region"
                            required
                        />
                    </Col>
                </Form.Group>

                <Form.Group
                    as={Row}
                    controlId="formZipCode"
                    className="mb-3"
                    style={{ marginBottom: "0px" }}
                >
                    <Col sm={12}>
                        <Form.Control
                            type="text"
                            placeholder="ZIP/Postal Code"
                            required
                        />
                    </Col>
                </Form.Group>

                <Form.Group
                    as={Row}
                    controlId="formCountry"
                    className="mb-3"
                    style={{ marginBottom: "0px" }}
                >
                    <Col sm={12}>
                        <Form.Control
                            type="text"
                            placeholder="Country"
                            required
                        />
                    </Col>
                </Form.Group>
            </div>
        </Form>
    );
};
