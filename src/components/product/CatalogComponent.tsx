import React, { useEffect, useState } from "react";
import {
    Container,
    Row,
    Col,
    Form,
    FormGroup,
    FormControl,
    FormLabel,
    Button
} from "react-bootstrap";
import { Cart, cart_HookCartState, getCart } from "../interface/cart";

export const CartPage = (): JSX.Element => {
    const [cart, setCart] = useState<Cart>(getCart());
    const [shippingAddress, setShippingAddress] = useState({
        fullName: "",
        streetAddress: "",
        city: "",
        state: "",
        zipCode: ""
    });

    useEffect(() => cart_HookCartState(setCart), []);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setShippingAddress({
            ...shippingAddress,
            [event.target.name]: event.target.value
        });
    };

    return (
        <Container fluid className="flex-grow-1 ez-bg">
            <Container className="h-100 side-shadow">
                <h1 className="p-4">Your Cart</h1>
                <hr></hr>
                {cart.items.map((item, idx) => (
                    <p key={idx}>
                        {item.product.name} - x{item.quantity}
                    </p>
                ))}
                <h2>Shipping Address</h2>
                <Form>
                    <FormGroup as={Row} controlId="fullName">
                        <FormLabel column sm="2">
                            Full Name:
                        </FormLabel>
                        <Col sm="10">
                            <FormControl
                                type="text"
                                name="fullName"
                                value={shippingAddress.fullName}
                                onChange={handleInputChange}
                            />
                        </Col>
                    </FormGroup>
                    {/* Add other form groups for streetAddress, city, state, and zipCode */}
                </Form>
                <Button
                    variant="primary"
                    onClick={() => console.log("Submit shipping address")}
                >
                    Submit Shipping Address
                </Button>
            </Container>
        </Container>
    );
};
