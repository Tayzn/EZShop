import React from "react";
import "./App.css";

import { useState } from "react";

import { Container, Col } from "react-bootstrap";

import { HeaderNav } from "./components/HeaderNav";
import { ImageBanner } from "./components/ImageBanner";
import { Inventory } from "./components/Inventory";
import { Cart } from "./components/Cart";
import { Footer } from "./components/Footer";
import { ProductDisplayGrid } from "./components/product/ProductDisplayGrid";

function App(): JSX.Element {
    const [cartView, setCartView] = useState<boolean>(false);

    return (
        <Container fluid className="m-0 p-0">
            <Col className="vh-100">
                <HeaderNav setCartView={setCartView} />
                {cartView ? (
                    <Cart />
                ) : (
                    <>
                        <ImageBanner />
                        <Inventory />
                        <ProductDisplayGrid />
                    </>
                )}
                <Footer />
            </Col>
        </Container>
    );
}

export default App;
