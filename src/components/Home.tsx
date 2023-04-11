import React from "react";

import { Container } from "react-bootstrap";

import { Footer } from "./Footer";
import { ImageBanner } from "./ImageBanner";
import { Inventory } from "./Inventory";

export const Home = (): JSX.Element => {
    return (
        <Container
            fluid
            className="d-flex flex-column h-100 p-0 m-0 ez-bg overflow-y-scroll"
        >
            <ImageBanner />
            <Inventory />
            <Footer />
        </Container>
    );
};
