import React, { useEffect, useState } from "react";

import { Button, Container } from "react-bootstrap";
import {
    Cart,
    addToCart,
    cart_HookCartState,
    getCart
} from "../interface/cart";
import { ProductData } from "../firebase/firebase_data";

export const CartPage = (): JSX.Element => {
    const [cart, setCart] = useState<Cart>(getCart());
    useEffect(() => cart_HookCartState(setCart), []);
    return (
        <Container fluid className="flex-grow-1 ez-bg">
            <Container className="h-100 side-shadow">
                <h1 className="p-4">Your Cart</h1>
                <hr></hr>
                {cart.items.map((item, idx) => (
                    <p key={idx}>
                        {item.product.name} - x{item.quantity}
                    </p>
                ))}
            </Container>
        </Container>
    );
};
