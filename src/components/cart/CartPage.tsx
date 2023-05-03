import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { Container, Col, Button } from "react-bootstrap";
import { placeOrder, useCart } from "../../interface/cart";

import { CartItemDisplay } from "./CartItemDisplay";
import { ShippingForm } from "./ShippingForm";
import { OrderModal } from "./OrderModal";
import { PaymentModal } from "./PaymentModal";

import { useLoggedInUser } from "../../firebase/firebase_auth";
import { User } from "firebase/auth";

export const CartPage = (): JSX.Element => {
    const cart = useCart();
    const user: User | null = useLoggedInUser();
    const [shippingPrice, setShippingPrice] = useState<number>(5.99);
    const [total, setTotal] = useState<number>(0.0);
    const [orderComplete, setOrderComplete] = useState<boolean>(false);
    const [confirmation, setConfirmation] = useState<boolean>(false);
    useEffect(() => calculateTotal(), [cart, shippingPrice]);

    const navigate = useNavigate();

    const calculateTotal = () => {
        const cartTotal: number = cart.items.reduce(
            (sum, item) => (sum += item.product.price * item.quantity),
            0
        );
        setTotal(cartTotal + shippingPrice);
    };

    const submitOrder = () => {
        setConfirmation(false);
        placeOrder(user);
        setOrderComplete(true);
        setTimeout(
            () =>
                navigate("/confirmation", {
                    state: { cartItems: cart.items, total: total }
                }),
            1500
        );
    };

    return (
        <Container fluid className="flex-grow-1 ez-bg">
            <Container className="h-100 side-shadow">
                <h1 className="p-4">Your Cart</h1>
                <hr></hr>
                <Container className="d-flex flex-row">
                    <Col xs={8}>
                        {cart.items.map((item, idx) => (
                            <CartItemDisplay key={idx} item={item} />
                        ))}
                    </Col>
                    <Col xs={1}>
                        <></>
                    </Col>
                    <Col>
                        <Container
                            className="p-3"
                            style={{ backgroundColor: "#e6e6e6" }}
                        >
                            <h2>
                                Total:{" "}
                                {cart.items.length === 0
                                    ? "$0.00"
                                    : "$" +
                                      total.toLocaleString(undefined, {
                                          minimumFractionDigits: 2
                                      })}
                            </h2>
                            <hr></hr>
                            <div className="mt-4">
                                <ShippingForm
                                    shippingPrice={shippingPrice}
                                    setShippingPrice={setShippingPrice}
                                />
                            </div>
                            <Button
                                variant="success"
                                size="lg"
                                disabled={cart.items.length === 0}
                                onClick={() => setConfirmation(true)}
                            >
                                Payment »
                            </Button>
                        </Container>
                    </Col>
                </Container>
                <OrderModal orderComplete={orderComplete} />
                <PaymentModal
                    confirmation={confirmation}
                    setConfirmation={setConfirmation}
                    submitOrder={submitOrder}
                />
            </Container>
        </Container>
    );
};
