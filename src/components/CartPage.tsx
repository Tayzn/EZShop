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
                <Button
                    onClick={() => {
                        ProductData.list().then((items) => {
                            const item =
                                items[Math.floor(Math.random() * items.length)];
                            addToCart(
                                item.data,
                                Math.floor(Math.random() * items.length),
                                item.data.variants
                                    ? Math.floor(
                                          Math.random() *
                                              item.data.variants.length
                                      )
                                    : null
                            );
                        });
                    }}
                >
                    Add Debug Item
                </Button>
            </Container>
        </Container>
    );
};
