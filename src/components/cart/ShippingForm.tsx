import React, { useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { UserAddress } from "../../interface/account";

interface ShippingFormProps {
    user: boolean;
    shippingOption: string;
    setShippingOption: (newOption: string) => void;
    standardShippingPercent: number;
    expressShippingPercent: number;
    address: UserAddress;
    setAddress: (newAddress: UserAddress) => void;
    saveShipping: boolean;
    setSaveShipping: (newShipping: boolean) => void;
}

export const ShippingForm: React.FC<ShippingFormProps> = ({
    user,
    shippingOption,
    setShippingOption,
    standardShippingPercent,
    expressShippingPercent,
    address,
    setAddress,
    saveShipping,
    setSaveShipping
}) => {
    const [streetTouched, setStreetTouched] = useState(false);
    const [cityTouched, setCityTouched] = useState(false);
    const [stateTouched, setStateTouched] = useState(false);
    const [zipTouched, setZipTouched] = useState(false);

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
                            label={`Standard Delivery - ${standardShippingPercent}%`}
                            name="deliveryOption"
                            value="standard"
                            id="standardDelivery"
                            checked={shippingOption === "standard"}
                            onChange={(e) => setShippingOption(e.target.value)}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Check
                            type="radio"
                            label={`Express Delivery - ${expressShippingPercent}%`}
                            name="deliveryOption"
                            value="express"
                            id="expressDelivery"
                            checked={shippingOption === "express"}
                            onChange={(e) => setShippingOption(e.target.value)}
                        />
                    </Col>
                </Row>
            </div>{" "}
            <Form.Group as={Row} controlId="formStreetAddress" className="mb-3">
                <Col sm={12}>
                    <Form.Control
                        type="text"
                        placeholder="Street Address"
                        required
                        pattern="^\d+\s+.*$"
                        title="Street address must start with a number followed by a space."
                        value={address.addr1}
                        onChange={(e) => {
                            setAddress({
                                ...address,
                                addr1: e.target.value
                            });
                            setStreetTouched(true);
                        }}
                        isInvalid={
                            streetTouched && !address.addr1.match(/^\d+\s+.*$/)
                        }
                    />
                    <Form.Control.Feedback type="invalid">
                        This must start with a number followed by a space.
                    </Form.Control.Feedback>
                </Col>
            </Form.Group>
            <Form.Group
                as={Row}
                controlId="formApartmentAddress"
                className="mb-3"
            >
                <Col sm={12}>
                    <Form.Control
                        type="text"
                        placeholder="Apartment"
                        pattern="^[\w\s\-]*$"
                        title="Apartment can only contain letters, spaces, and hyphens."
                        isInvalid={Boolean(
                            address.addr2 && !address.addr2.match(/^[\w\s-]*$/)
                        )}
                        onChange={(e) => {
                            setAddress({
                                ...address,
                                addr2: e.target.value
                            });
                        }}
                    />
                    <Form.Control.Feedback type="invalid">
                        This can only contain letters, spaces, and hyphens.
                    </Form.Control.Feedback>
                </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="formCity" className="mb-3">
                <Col sm={12}>
                    <Form.Control
                        type="text"
                        placeholder="City"
                        required
                        pattern="^[\w\s-]+$"
                        title="City can only contain letters, spaces, and hyphens."
                        value={address.city}
                        onChange={(e) => {
                            setAddress({
                                ...address,
                                city: e.target.value
                            });
                            setCityTouched(true);
                        }}
                        isInvalid={
                            cityTouched &&
                            address.city !== null &&
                            !address.city.match(/^[\w\s-]+$/)
                        }
                    />
                    <Form.Control.Feedback type="invalid">
                        This can only contain letters, spaces, and hyphens.
                    </Form.Control.Feedback>
                </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="formState" className="mb-3">
                <Col sm={12}>
                    <Form.Control
                        type="text"
                        placeholder="State"
                        required
                        pattern="^(?:\w{2}|[a-zA-Z\s]+)$"
                        title="State must be a 2-letter abbreviation or the full name."
                        value={address.state}
                        onChange={(e) => {
                            setAddress({
                                ...address,
                                state: e.target.value
                            });
                            setStateTouched(true);
                        }}
                        isInvalid={
                            stateTouched &&
                            !address.state.match(/^(?:\w{2}|[a-zA-Z\s]+)$/)
                        }
                    />
                    <Form.Control.Feedback type="invalid">
                        This must be a 2-letter abbreviation or the full name.
                    </Form.Control.Feedback>
                </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="formZip" className="mb-3">
                <Col sm={12}>
                    <Form.Control
                        type="text"
                        placeholder="Zip Code"
                        required
                        pattern="^\d{5}$"
                        title="Zip code must be 5 digits."
                        value={address.zip}
                        onChange={(e) => {
                            setAddress({
                                ...address,
                                zip: e.target.value
                            });
                            setZipTouched(true);
                        }}
                        isInvalid={zipTouched && !address.zip.match(/^\d{5}$/)}
                    />
                    <Form.Control.Feedback type="invalid">
                        This must be 5 digits.
                    </Form.Control.Feedback>
                </Col>
            </Form.Group>
            {user && (
                <Form.Group
                    as={Row}
                    controlId="formSaveShipping"
                    className="mb-3"
                >
                    <Col sm={12}>
                        <Form.Check
                            type="checkbox"
                            label="Save this shipping address for future orders"
                            checked={saveShipping}
                            onChange={(e) => setSaveShipping(e.target.checked)}
                        />
                    </Col>
                </Form.Group>
            )}
        </Form>
    );
};
