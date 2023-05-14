import React from "react";

import { Modal, Image, Container, Button } from "react-bootstrap";

export const OrderModal = ({
    orderComplete,
    orderFailReason,
    orderReset
}: {
    orderComplete: boolean;
    orderFailReason?: string;
    orderReset: () => void;
}): JSX.Element => {
    return (
        <Modal show={orderComplete} size="sm" centered>
            {orderFailReason ? (
                <Modal.Body className="d-flex flex-column text-center">
                    <h2>Failed to Place Order</h2>
                    <Container className="px-4 py-4">
                        <Image
                            fluid
                            thumbnail
                            roundedCircle
                            src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Cross_red_circle.svg"
                        />
                    </Container>
                    <h6>{orderFailReason}</h6>
                    <Button onClick={orderReset}>Close</Button>
                </Modal.Body>
            ) : (
                <Modal.Body className="d-flex flex-column text-center">
                    <h2>Order Placed</h2>
                    <Container className="px-4 py-4">
                        <Image
                            fluid
                            thumbnail
                            roundedCircle
                            src="https://upload.wikimedia.org/wikipedia/commons/6/6f/Eo_circle_light-green_checkmark.svg"
                        />
                    </Container>
                    <h6>Redirecting...</h6>
                </Modal.Body>
            )}
        </Modal>
    );
};
