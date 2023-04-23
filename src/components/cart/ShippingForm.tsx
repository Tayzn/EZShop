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
            <h2 className="mb-4">Shipping</h2>
            <div className="mb-4">
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
                <h4>Shipping Address</h4>
                <Form.Label>
                    Enter your shipping address (e.g. 123 StName, CityName, USA
                    12345)
                </Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Shipping address"
                    required
                />
            </div>
        </Form>
    );
};
