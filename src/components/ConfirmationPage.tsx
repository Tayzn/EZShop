import React from "react";
import { Container, Button } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { BasicDisplayCard } from "../components/cart/BasicDisplayCard";
import { CartItem } from "../interface/cart";

export const ConfirmationPage = (): JSX.Element => {
    const location = useLocation();
    const cartItems = location.state?.cartItems || [];
    const total = location.state?.total || 0;
    return (
        <Container
            fluid
            className="d-flex flex-column flex-grow-1 align-items-center justify-content-center"
        >
            <h1 className="mb-4">
                Receipt - $
                {total.toLocaleString(undefined, {
                    minimumFractionDigits: 2
                })}
            </h1>
            <Container className="d-flex flex-column w-25">
                {cartItems.map((item: CartItem, idx: number) => (
                    <BasicDisplayCard key={idx} item={item} />
                ))}
            </Container>
            <Button variant="success" size="lg" href="#/" className="mt-4">
                Return Home
            </Button>
        </Container>
    );
};
