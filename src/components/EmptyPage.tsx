import React from "react";

import { Container, Image } from "react-bootstrap";

export const EmptyPage = (): JSX.Element => {
    return (
        <Container
            fluid
            className="d-flex flex-column justify-content-center align-items-center"
            style={{ height: "90%" }}
        >
            <Image
                thumbnail
                className="my-4"
                src="https://i.ibb.co/WzvwDh7/monkey.png"
            />
            <p style={{ fontWeight: "500" }}>
                There is nothing here. Go somewhere else.
            </p>
        </Container>
    );
};
