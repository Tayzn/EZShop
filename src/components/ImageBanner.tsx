import React from "react";
import { Container, Image } from "react-bootstrap";

const bannerUrl = "https://i.ibb.co/BKgX1tt/bannergrad.png";

export const ImageBanner = (): JSX.Element => {
    return (
        <Container fluid className="p-0 m-0">
            <Image fluid src={bannerUrl} />
        </Container>
    );
};
