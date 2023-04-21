import React from "react";
import "./App.css";

import { Col, Container } from "react-bootstrap";

import { Route, Routes } from "react-router-dom";

import { CartPage } from "./components/CartPage";
import { EmptyPage } from "./components/EmptyPage";
import { HeaderNav } from "./components/HeaderNav";
import { AdminPage } from "./components/admin/AdminPage";
import { Home } from "./components/Home";
import { Footer } from "./components/Footer";

function App(): JSX.Element {
    return (
        <Container fluid className="m-0 p-0 vh-100">
            <Col className="h-100 d-flex flex-column">
                <HeaderNav />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/admin" element={<AdminPage />} />
                    <Route path="*" element={<EmptyPage />} />
                </Routes>
                <Footer />
            </Col>
        </Container>
    );
}

export default App;
