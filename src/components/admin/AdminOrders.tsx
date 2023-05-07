import React, { useState } from "react";

import { Container, Table, Alert } from "react-bootstrap";
import { useAllOrders } from "../../interface/order";
import { useLoggedInUser } from "../../firebase/firebase_auth";
import { User } from "firebase/auth";

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
                            <th>Product Name</th>
                            <th>Price</th>
                            <th>Stock</th>
                            <th>Modify</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => {
                            return (
                                <tr key={order.reference.id}>
                                    <td>{order.data.user}</td>
                                    <td>{order.data.status}</td>
                                    <td>{order.data.items[0].product.name}</td>
                                    <td>{order.data.address.addr1}</td>
                                    <td>{order.data.payment.cardholderName}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            )}
        </Container>
    );
};
