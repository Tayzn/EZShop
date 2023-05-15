import React, { useState, useEffect } from "react";
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

const states = [
    { abbr: "AL", name: "Alabama" },
    { abbr: "AK", name: "Alaska" },
    { abbr: "AZ", name: "Arizona" },
    { abbr: "AR", name: "Arkansas" },
    { abbr: "CA", name: "California" },
    { abbr: "CO", name: "Colorado" },
    { abbr: "CT", name: "Connecticut" },
    { abbr: "DE", name: "Delaware" },
    { abbr: "DC", name: "District of Columbia" },
    { abbr: "FL", name: "Florida" },
    { abbr: "GA", name: "Georgia" },
    { abbr: "HI", name: "Hawaii" },
    { abbr: "ID", name: "Idaho" },
    { abbr: "IL", name: "Illinois" },
    { abbr: "IN", name: "Indiana" },
    { abbr: "IA", name: "Iowa" },
    { abbr: "KS", name: "Kansas" },
    { abbr: "KY", name: "Kentucky" },
    { abbr: "LA", name: "Louisiana" },
    { abbr: "ME", name: "Maine" },
    { abbr: "MD", name: "Maryland" },
    { abbr: "MA", name: "Massachusetts" },
    { abbr: "MI", name: "Michigan" },
    { abbr: "MN", name: "Minnesota" },
    { abbr: "MS", name: "Mississippi" },
    { abbr: "MO", name: "Missouri" },
    { abbr: "MT", name: "Montana" },
    { abbr: "NE", name: "Nebraska" },
    { abbr: "NV", name: "Nevada" },
    { abbr: "NH", name: "New Hampshire" },
    { abbr: "NJ", name: "New Jersey" },
    { abbr: "NM", name: "New Mexico" },
    { abbr: "NY", name: "New York" },
    { abbr: "NC", name: "North Carolina" },
    { abbr: "ND", name: "North Dakota" },
    { abbr: "OH", name: "Ohio" },
    { abbr: "OK", name: "Oklahoma" },
    { abbr: "OR", name: "Oregon" },
    { abbr: "PA", name: "Pennsylvania" },
    { abbr: "RI", name: "Rhode Island" },
    { abbr: "SC", name: "South Carolina" },
    { abbr: "SD", name: "South Dakota" },
    { abbr: "TN", name: "Tennessee" },
    { abbr: "TX", name: "Texas" },
    { abbr: "UT", name: "Utah" },
    { abbr: "VT", name: "Vermont" },
    { abbr: "VA", name: "Virginia" },
    { abbr: "WA", name: "Washington" },
    { abbr: "WV", name: "West Virginia" },
    { abbr: "WI", name: "Wisconsin" },
    { abbr: "WY", name: "Wyoming" }
];

const statePattern = new RegExp(
    `^(?:${states.map((s) => `${s.abbr}|${s.name}`).join("|")})$`,
    "i"
);

const generateExpectedDeliveryDate = (daysToAdd: number) => {
    const date = new Date();
    date.setDate(date.getDate() + daysToAdd);
    return `${date.toLocaleString("default", {
        month: "long"
    })} ${date.getDate()}, ${date.getFullYear()}`;
};

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
    const [apartmentTouched, setApartmentTouched] = useState(false);
    const [cityTouched, setCityTouched] = useState(false);
    const [stateTouched, setStateTouched] = useState(false);
    const [zipTouched, setZipTouched] = useState(false);

    const [standardDeliveryDate, setStandardDeliveryDate] = useState("");
    const [expressDeliveryDate, setExpressDeliveryDate] = useState("");

    useEffect(() => {
        setStandardDeliveryDate(
            generateExpectedDeliveryDate(Math.floor(Math.random() * 4) + 4)
        );
        setExpressDeliveryDate(
            generateExpectedDeliveryDate(Math.floor(Math.random() * 3) + 1)
        );
    }, []);

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
                        <small
                            className="text-muted"
                            style={{
                                fontFamily: "inherit",
                                paddingLeft: "2em"
                            }}
                        >
                            {"\t"}Expected by: {standardDeliveryDate}
                        </small>
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
                        <small
                            className="text-muted"
                            style={{
                                fontFamily: "inherit",
                                paddingLeft: "2em"
                            }}
                        >
                            Expected by: {expressDeliveryDate}
                        </small>
                    </Col>
                </Row>
            </div>
            <Form.Group as={Row} controlId="formStreetAddress" className="mb-3">
                <Col sm={12}>
                    <Form.Control
                        type="text"
                        placeholder="Street Address"
                        required
                        pattern="^\d+\s+[a-zA-Z\s-]+$"
                        title="Street address must start with a number followed by a space, and can only contain letters, spaces, and hyphens."
                        value={address.addr1}
                        onChange={(e) => {
                            setAddress({
                                ...address,
                                addr1: e.target.value
                            });
                            setStreetTouched(true);
                        }}
                        isInvalid={
                            streetTouched &&
                            !address.addr1.match(/^\d+\s+[a-zA-Z\s-]+$/)
                        }
                    />
                    <Form.Control.Feedback type="invalid">
                        This must start with a number followed by a space. It
                        can only contain letters, spaces, and hyphens.
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
                        pattern="^[a-zA-Z\d\s#-]*$"
                        title="Apartment can only contain letters, numbers, spaces, hyphens, and the # symbol."
                        value={address.addr2 || ""}
                        onChange={(e) => {
                            setAddress({
                                ...address,
                                addr2: e.target.value
                            });
                            setApartmentTouched(true);
                        }}
                        isInvalid={Boolean(
                            address.addr2 &&
                                apartmentTouched &&
                                !address.addr2.match(/^[a-zA-Z\d\s#-]*$/)
                        )}
                    />
                    <Form.Control.Feedback type="invalid">
                        This can only contain letters, numbers, spaces, hyphens,
                        and the # symbol.
                    </Form.Control.Feedback>
                </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="formCity" className="mb-3">
                <Col sm={12}>
                    <Form.Control
                        type="text"
                        placeholder="City"
                        required
                        pattern="^[a-zA-Z\s-]+$"
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
                            !address.city.match(/^[a-zA-Z\s-]+$/)
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
                        pattern={statePattern.source}
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
                            stateTouched && !address.state.match(statePattern)
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

