import React from "react";

import { Container } from "react-bootstrap";

export const Cart = (): JSX.Element => {
    return (
        <Container
            fluid
            style={{
                backgroundImage: "url(https://i.ibb.co/5xctNYH/ezbg.png)"
            }}
            className="flex-grow-1"
        >
            <Container
                className="h-100"
                style={{
                    backgroundColor: "white",
                    boxShadow:
                        "0 9px 0px 0px white, 0 -9px 0px 0px white, 12px 0 15px -4px rgba(0, 0, 0, 0.2), -12px 0 15px -4px rgba(0, 0, 0, 0.2)"
                }}
            >
                Cart Test
            </Container>
        </Container>
    );
};
