import React, { useState } from "react";

import { User } from "firebase/auth";
import { Alert, Button, Container, Table } from "react-bootstrap";
import { useLoggedInUser } from "../../firebase/firebase_auth";
import { setOrderStatus, useAllOrders } from "../../interface/order";

export const AdminOrders = (): JSX.Element => {
    const [loaded, setLoaded] = useState<boolean>(false);
    const [loadError, setLoadError] = useState<string>("");

    const user: User | null = useLoggedInUser();

    const orders = useAllOrders(
        user,
        [],
        () => setLoaded(true),
        (reason) => {
            setLoaded(true);
            setLoadError(reason);
        }
    );

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
                    Failed to load products - {loadError}
                </Alert>
            ) : (
                <Table striped className="mt-2">
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Order Status</th>
                            <th>User</th>
                            <th>Total</th>
                            <th>Cart</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order, index) => {
                            let total = 0;

                            order.data.items.map((item) => {
                                {
                                    total += item.product.price * item.quantity;
                                }
                            });

                            return (
                                <tr key={index}>
                                    <td>#{index}</td>
                                    <td>{order.data.status}</td>
                                    <td>{order.data.payment.cardholderName}</td>
                                    <td>${total}</td>
                                    <td>
                                        <Button
                                            size="sm"
                                            variant="info"
                                            onClick={() => {
                                                console.log("click");
                                            }}
                                        >
                                            View
                                        </Button>
                                    </td>
                                    <td>
                                        {order.data.status == "pending" ? (
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
                                                    }}
                                                >
                                                    Approve
                                                </Button>
                                                <Button
                                                    variant="danger"
                                                    size="sm"
                                                    onClick={() => {
                                                        setOrderStatus(
                                                            order,
                                                            "cancelled"
                                                        );
                                                    }}
                                                >
                                                    Refund
                                                </Button>
                                            </div>
                                        ) : (
                                            <div className="d-grid gap-2">
                                                {order.data.status ==
                                                "complete" ? (
                                                    <Button
                                                        variant="success"
                                                        size="sm"
                                                        disabled
                                                    >
                                                        Approved
                                                    </Button>
                                                ) : (
                                                    <Button
                                                        variant="danger"
                                                        size="sm"
                                                        disabled
                                                    >
                                                        Refunded
                                                    </Button>
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
        </Container>
    );
};
