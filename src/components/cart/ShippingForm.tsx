import React from "react";
import { Col, Form, Row } from "react-bootstrap";

import { UserAddress } from "../../interface/account";

export const ShippingForm = ({
    user,
    shippingPrice,
    setShippingPrice,
    address,
    setAddress,
    saveShipping,
    setSaveShipping
}: {
    user: boolean;
    shippingPrice: number;
    setShippingPrice: (newNumber: number) => void;
    address: UserAddress;
    setAddress: (newAddress: UserAddress) => void;
    saveShipping: boolean;
    setSaveShipping: (newShipping: boolean) => void;
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
                            value={address.addr1}
                            onChange={(e) =>
                                setAddress({
                                    ...address,
                                    addr1: e.target.value
                                })
                            }
                        />
                    </Col>
                </Form.Group>

                <Form.Group
                    as={Row}
                    controlId="formStreetAddress2"
                    className="mb-3"
                >
                    <Col sm={12}>
                        <Form.Control
                            type="text"
                            placeholder="Apartment"
                            value={!address.addr2 ? "" : address.addr2}
                            onChange={(e) =>
                                setAddress({
                                    ...address,
                                    addr2: e.target.value
                                })
                            }
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
                            placeholder="City"
                            required
                            value={address.city}
                            onChange={(e) =>
                                setAddress({
                                    ...address,
                                    city: e.target.value
                                })
                            }
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
                            placeholder="State"
                            required
                            value={address.state}
                            onChange={(e) =>
                                setAddress({
                                    ...address,
                                    state: e.target.value
                                })
                            }
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
                            placeholder="Zip"
                            required
                            value={address.zip}
                            onChange={(e) =>
                                setAddress({
                                    ...address,
                                    zip: e.target.value
                                })
                            }
                        />
                    </Col>
                </Form.Group>
                {user && (
                    <Form.Check
                        label="Save shipping info for next time"
                        id="save-shipping-info"
                        checked={saveShipping}
                        onChange={(e) => setSaveShipping(e.target.checked)}
                    />
                )}
            </div>
        </Form>
    );
};
