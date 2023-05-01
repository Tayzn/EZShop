import React from "react";
import { Container, Button } from "react-bootstrap";
import { Cart } from "../interface/cart";
import { BasicDisplayCard } from "../components/cart/BasicDisplayCard";

export const ConfirmationPage = ({ cart }: { cart: Cart }): JSX.Element => {
    return (
        <Container
            fluid
            className="d-flex flex-column flex-grow-1 align-items-center justify-content-center"
        >
            <h1 className="mb-4">Receipt</h1>
            <Container className="d-flex flex-column w-25">
                {cart.items.map((item, idx) => (
                    <BasicDisplayCard key={idx} item={item} />
                ))}
            </Container>
            <Button variant="success" size="lg" href="#/" className="mt-4">
                Return Home
            </Button>
        </Container>
    );
};
