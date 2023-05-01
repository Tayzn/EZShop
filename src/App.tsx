import React, { useState } from "react";
import "./App.css";

import { Col, Container } from "react-bootstrap";

import { Route, Routes } from "react-router-dom";

import { AdminPage } from "./components/admin/AdminPage";
import { CartPage } from "./components/cart/CartPage";
import { ConfirmationPage } from "./components/ConfirmationPage";
import { EmptyPage } from "./components/EmptyPage";
import { Footer } from "./components/Footer";
import { HeaderNav } from "./components/HeaderNav";
import { Home } from "./components/Home";
import { ProfilePage } from "./components/ProfilePage";

import { Cart } from "./interface/cart";

function App(): JSX.Element {
    const [receiptCart, setReceiptCart] = useState<Cart>({ items: [] });

    return (
        <Container fluid className="m-0 p-0 vh-100">
            <Col className="h-100 d-flex flex-column">
                <HeaderNav />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route
                        path="/cart"
                        element={<CartPage setReceiptCart={setReceiptCart} />}
                    />
                    <Route
                        path="/confirmation"
                        element={<ConfirmationPage cart={receiptCart} />}
                    />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/admin" element={<AdminPage />} />
                    <Route path="*" element={<EmptyPage />} />
                </Routes>
                <Footer />
            </Col>
        </Container>
    );
}

export default App;
