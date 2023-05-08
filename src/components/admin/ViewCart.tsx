import React from "react";
import { Modal } from "react-bootstrap";
import { CartItem } from "../../interface/cart";
import { BasicDisplayCard } from "../cart/BasicDisplayCard";

export const ViewCart = ({
    cartView,
    setCartView,
    cartItems
}: {
    cartView: boolean;
    setCartView: (newCartView: boolean) => void;
    cartItems: CartItem[];
}) => {
    return (
        <Modal show={cartView} centered onHide={() => setCartView(false)}>
            <Modal.Header>
                <h2>Order Cart</h2>
            </Modal.Header>
            <Modal.Body>
                {cartItems.map((item, index) => (
                    <BasicDisplayCard key={index} item={item} />
                ))}
            </Modal.Body>
            <Modal.Footer>
                <h3>
                    Total: $
                    {cartItems
                        .reduce(
                            (sum, item) =>
                                (sum += item.product.price * item.quantity),
                            0
                        )
                        .toLocaleString(undefined, {
                            minimumFractionDigits: 2
                        })}
                </h3>
            </Modal.Footer>
        </Modal>
    );
};
