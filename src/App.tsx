import React from "react";
import "./App.css";

import { Col, Container } from "react-bootstrap";

import { Route, Routes } from "react-router-dom";

import { Cart } from "./components/Cart";
import { EmptyPage } from "./components/EmptyPage";
import { HeaderNav } from "./components/HeaderNav";
import { Home } from "./components/Home";
import { Footer } from "./components/Footer";

function App(): JSX.Element {
    return (
        <Container fluid className="m-0 p-0 vh-100">
            <Col className="h-100 d-flex flex-column">
                <HeaderNav />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="*" element={<EmptyPage />} />
                </Routes>
                <Footer />
            </Col>
        </Container>
    );
}

export default App;
