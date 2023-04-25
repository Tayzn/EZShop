import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { Container, Col, Button } from "react-bootstrap";
import {
    Cart,
    cart_HookCartState,
    getCart,
    placeOrder
} from "../../interface/cart";

import { CartItemDisplay } from "./CartItemDisplay";
import { ShippingForm } from "./ShippingForm";
import { OrderModal } from "./OrderModal";

export const CartPage = (): JSX.Element => {
    const [cart, setCart] = useState<Cart>(getCart());
    const [shippingPrice, setShippingPrice] = useState<number>(5.99);
    const [total, setTotal] = useState<number>(0.0);
    const [orderComplete, setOrderComplete] = useState<boolean>(false);
    useEffect(() => cart_HookCartState(setCart), []);
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
        placeOrder();
        setOrderComplete(true);
        setTimeout(() => navigate("/confirmation"), 1500);
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
                                    : "$" + total}
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
                                onClick={() => submitOrder()}
                            >
                                Payment »
                            </Button>
                        </Container>
                    </Col>
                </Container>
                <OrderModal orderComplete={orderComplete} />
            </Container>
        </Container>
    );
};
