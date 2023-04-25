import React from "react";

import { Modal, Image, Container } from "react-bootstrap";

export const OrderModal = ({
    orderComplete
}: {
    orderComplete: boolean;
}): JSX.Element => {
    return (
        <Modal show={orderComplete} size="sm" centered>
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
        </Modal>
    );
};
