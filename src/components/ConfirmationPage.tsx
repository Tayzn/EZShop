import React from "react";
import { Container, Button } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { BasicDisplayCard } from "../components/cart/BasicDisplayCard";
import { CartItem } from "../interface/cart";

const generateTrackingNumber = () => {
    const alphanumericCharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const trackingNumberLength = 14;
    let trackingNumber = "";

    for (let i = 0; i < trackingNumberLength; i++) {
        const randomIndex = Math.floor(
            Math.random() * alphanumericCharacters.length
        );
        trackingNumber += alphanumericCharacters[randomIndex];
    }

    return trackingNumber;
};

const generateRandomDeliveryDate = (shippingMethod: string) => {
    const currentDate = new Date();
    const deliveryDate = new Date(currentDate);
    const minDays = shippingMethod === "express" ? 1 : 4;
    const maxDays = shippingMethod === "express" ? 3 : 7;

    const randomDays =
        Math.floor(Math.random() * (maxDays - minDays + 1)) + minDays;
    deliveryDate.setDate(currentDate.getDate() + randomDays);

    return deliveryDate.toLocaleDateString();
};

export const ConfirmationPage = (): JSX.Element => {
    const location = useLocation();
    const cartItems = location.state?.cartItems || [];
    const total = location.state?.total || 0;
    const shippingMethod = location.state?.shippingMethod || "standard";
    const trackingNumber = generateTrackingNumber();
    const deliveryDate = generateRandomDeliveryDate(shippingMethod);

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
            <p
                className="text-center text-muted mt-1"
                style={{ fontSize: "smaller" }}
            >
                <strong>Tracking Number:</strong> {trackingNumber}
            </p>
            <p
                className="text-center text-muted mt-1"
                style={{ fontSize: "smaller" }}
            >
                <strong>Expected Delivery Date:</strong> {deliveryDate}
            </p>
            <Button variant="success" size="lg" href="#/" className="mt-1">
                Return Home
            </Button>
        </Container>
    );
};
