import React from "react";
import "./App.css";

import { Container, Col } from "react-bootstrap";

import { HeaderNav } from "./components/HeaderNav";
import { ImageBanner } from "./components/ImageBanner";
import { Inventory } from "./components/Inventory";
import { Footer } from "./components/Footer";

function App(): JSX.Element {
    return (
        <Container fluid className="m-0 p-0" style={{ overflowY: "hidden" }}>
            <Col className="vh-100">
                <HeaderNav />
                <ImageBanner />
                <Inventory />
                <Footer />
            </Col>
        </Container>
    );
}

export default App;
