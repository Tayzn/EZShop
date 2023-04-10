import React from "react";
import "./App.css";

import { Container, Col } from "react-bootstrap";

import { Route, Routes } from "react-router-dom";

import { HeaderNav } from "./components/HeaderNav";
import { ImageBanner } from "./components/ImageBanner";
import { Inventory } from "./components/Inventory";
import { Cart } from "./components/Cart";
import { Footer } from "./components/Footer";
import { ProductDisplayGrid } from "./components/product/ProductDisplayGrid";

function App(): JSX.Element {
    const home = (): JSX.Element => {
        return (
            <>
                <ImageBanner />
                <Inventory />
                <ProductDisplayGrid />
            </>
        );
    };

    return (
        <Container fluid className="m-0 p-0">
            <Col className="vh-100">
                <HeaderNav />
                <Routes>
                    <Route path="/" element={home()} />
                    <Route path="/cart" element={<Cart />} />
                </Routes>
                <Footer />
            </Col>
        </Container>
    );
}

export default App;
