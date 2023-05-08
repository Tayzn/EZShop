import React, { useState } from "react";

import { User } from "firebase/auth";
import { Alert, Button, Container, Table, Badge } from "react-bootstrap";
import { useLoggedInUser } from "../../firebase/firebase_auth";
import { setOrderStatus, useAllOrders } from "../../interface/order";
import { Timestamp } from "firebase/firestore";

export const AdminOrders = (): JSX.Element => {
    const [loaded, setLoaded] = useState<boolean>(false);
    const [loadError, setLoadError] = useState<string>("");
    const [updates, setUpdates] = useState<number>(0);

    const user: User | null = useLoggedInUser();

    const orders = useAllOrders(
        user,
        [updates],
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
                            <th>Cart</th>
                            <th>Update</th>
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
                                            item.product.price * item.quantity;
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
                                                variant="info"
                                                onClick={() => {
                                                    console.log("click");
                                                }}
                                            >
                                                View
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
                                                            setUpdates(
                                                                updates + 1
                                                            );
                                                        }}
                                                    >
                                                        Refund
                                                    </Button>
                                                </div>
                                            ) : (
                                                <div className="d-grid gap-2">
                                                    {order.data.status ===
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
