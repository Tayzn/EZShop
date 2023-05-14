import React, { useState } from "react";

import { User } from "firebase/auth";
import { Alert, Button, Container, Table, Badge } from "react-bootstrap";
import { useLoggedInUser } from "../../firebase/firebase_auth";
import {
    setOrderStatus,
    useAllOrders,
    deleteOrder
} from "../../interface/order";
import { Timestamp } from "firebase/firestore";
import { ViewCart } from "./ViewCart";
import { CartItem } from "../../interface/cart";
import {
    UserAddress,
    UserPayment,
    getDefaultAddress,
    getDefaultPayment
} from "../../interface/account";
import { ViewPayment } from "./ViewPayment";
import { ViewShipping } from "./ViewShipping";

export const AdminOrders = (): JSX.Element => {
    const [loaded, setLoaded] = useState<boolean>(false);
    const [loadError, setLoadError] = useState<string>("");
    const [updates, setUpdates] = useState<number>(0);
    const [cartView, setCartView] = useState<boolean>(false);
    const [cart, setCart] = useState<CartItem[]>([]);
    const [paymentView, setPaymentView] = useState<boolean>(false);
    const [payment, setPayment] = useState<UserPayment>(getDefaultPayment());
    const [shipView, setShipView] = useState<boolean>(false);
    const [shipping, setShipping] = useState<UserAddress>(getDefaultAddress());

    const user: User | null = useLoggedInUser();

    const orders = useAllOrders(
        user,
        [updates, user],
        () => setLoaded(true),
        (reason) => {
            setLoaded(true);
            setLoadError(reason);
        }
    );

    const badgeColor = (status: string): string => {
        if (status === "cancelled") {
            return "danger";
        } else if (status === "complete") {
            return "success";
        } else {
            return "warning";
        }
    };

    if (!loaded) {
        return (
            <Container className="mt-3">
                <h2>Orders</h2>
                <p>Loading orders...</p>
            </Container>
        );
    }

    return (
        <Container className="mt-3">
            <h2>Orders</h2>
            {loadError ? (
                <Alert variant="danger">
                    {loadError} - Failed to load orders
                </Alert>
            ) : (
                <Table striped className="mt-2">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Order Status</th>
                            <th>Customer</th>
                            <th>Total</th>
                            <th>Info</th>
                            <th>Tools</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders
                            .sort((order1, order2) => {
                                let firstDate = order1.data.date;
                                let secondDate = order2.data.date;

                                if (firstDate instanceof Timestamp) {
                                    firstDate = firstDate.toDate();
                                }

                                if (secondDate instanceof Timestamp) {
                                    secondDate = secondDate.toDate();
                                }

                                if (firstDate > secondDate) {
                                    return -1;
                                } else if (firstDate < secondDate) {
                                    return 1;
                                } else {
                                    return 0;
                                }
                            })
                            .map((order, index) => {
                                let total = 0;

                                order.data.items.map((item) => {
                                    {
                                        total +=
                                            item.product.data.price *
                                            item.quantity;
                                    }
                                });

                                return (
                                    <tr key={index}>
                                        <td>#{index}</td>
                                        <td>
                                            <Badge
                                                bg={badgeColor(
                                                    order.data.status
                                                )}
                                            >
                                                {order.data.status.toUpperCase()}
                                            </Badge>
                                        </td>
                                        <td>
                                            {order.data.payment.cardholderName}
                                        </td>
                                        <td>${total}</td>
                                        <td>
                                            <Button
                                                size="sm"
                                                className="me-2"
                                                variant="info"
                                                onClick={() => {
                                                    setCartView(true);
                                                    setCart(order.data.items);
                                                }}
                                            >
                                                Cart
                                            </Button>
                                            <Button
                                                size="sm"
                                                className="me-2"
                                                variant="info"
                                                onClick={() => {
                                                    setPaymentView(true);
                                                    setPayment(
                                                        order.data.payment
                                                    );
                                                }}
                                            >
                                                Payment
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="info"
                                                onClick={() => {
                                                    setShipView(true);
                                                    setShipping(
                                                        order.data.address
                                                    );
                                                }}
                                            >
                                                Shipping
                                            </Button>
                                        </td>
                                        <td>
                                            {order.data.status === "pending" ? (
                                                <div>
                                                    <Button
                                                        size="sm"
                                                        variant="success"
                                                        className="me-2"
                                                        onClick={() => {
                                                            setOrderStatus(
                                                                order,
                                                                "complete"
                                                            );
                                                            setUpdates(
                                                                updates + 1
                                                            );
                                                        }}
                                                    >
                                                        Complete
                                                    </Button>
                                                    <Button
                                                        variant="danger"
                                                        size="sm"
                                                        onClick={() => {
                                                            setOrderStatus(
                                                                order,
                                                                "cancelled"
                                                            );
                                                            setUpdates(
                                                                updates + 1
                                                            );
                                                        }}
                                                    >
                                                        Cancel
                                                    </Button>
                                                </div>
                                            ) : (
                                                <div>
                                                    {order.data.status ===
                                                    "complete" ? (
                                                        <>
                                                            <Button
                                                                className="w-75 me-2"
                                                                variant="success"
                                                                size="sm"
                                                                disabled
                                                            >
                                                                Completed
                                                            </Button>
                                                            <Button
                                                                variant="danger"
                                                                size="sm"
                                                                onClick={() => {
                                                                    deleteOrder(
                                                                        order
                                                                    );
                                                                    setUpdates(
                                                                        updates +
                                                                            1
                                                                    );
                                                                }}
                                                            >
                                                                X
                                                            </Button>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Button
                                                                className="w-75 me-2"
                                                                variant="danger"
                                                                size="sm"
                                                                disabled
                                                            >
                                                                Cancelled
                                                            </Button>
                                                            <Button
                                                                variant="danger"
                                                                size="sm"
                                                                onClick={() => {
                                                                    deleteOrder(
                                                                        order
                                                                    );
                                                                    setUpdates(
                                                                        updates +
                                                                            1
                                                                    );
                                                                }}
                                                            >
                                                                X
                                                            </Button>
                                                        </>
                                                    )}
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                );
                            })}
                    </tbody>
                </Table>
            )}
            <ViewCart
                cartView={cartView}
                setCartView={setCartView}
                cartItems={cart}
            />
            <ViewPayment
                paymentView={paymentView}
                setPaymentView={setPaymentView}
                payment={payment}
            />
            <ViewShipping
                shipView={shipView}
                setShipView={setShipView}
                shipping={shipping}
            />
        </Container>
    );
};
