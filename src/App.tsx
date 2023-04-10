import React from "react";
import "./App.css";

import { Container, Col } from "react-bootstrap";

import { Route, Routes } from "react-router-dom";

import { HeaderNav } from "./components/HeaderNav";
import { ImageBanner } from "./components/ImageBanner";
import { Inventory } from "./components/Inventory";
import { EmptyPage } from "./components/EmptyPage";
import { Cart } from "./components/Cart";

function App(): JSX.Element {
    const home = (): JSX.Element => {
        return (
            <>
                <ImageBanner />
                <Inventory />
            </>
        );
    };

    return (
        <Container fluid className="m-0 p-0 vh-100">
            <Col className="h-100 d-flex flex-column">
                <HeaderNav />
                <Routes>
                    <Route path="/" element={home()} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="*" element={<EmptyPage />} />
                </Routes>
            </Col>
        </Container>
    );
}

export default App;
