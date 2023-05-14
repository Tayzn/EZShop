import React, { useState } from "react";

import { Container, Alert, Table, Button } from "react-bootstrap";
import {
    UserAddress,
    UserPayment,
    firstAddress,
    firstPayment,
    useAccounts,
    getDefaultPayment,
    getDefaultAddress,
    UserAccountPrivilege
} from "../../interface/account";
import { ViewPayment } from "./ViewPayment";
import { ViewShipping } from "./ViewShipping";
import { useLoggedInUserAccountPrivilege } from "../../firebase/firebase_auth";

export const AdminUsers = (): JSX.Element => {
    const [loaded, setLoaded] = useState<boolean>(false);
    const [paymentView, setPaymentView] = useState<boolean>(false);
    const [payment, setPayment] = useState<UserPayment>(getDefaultPayment());
    const [shipView, setShipView] = useState<boolean>(false);
    const [shipping, setShipping] = useState<UserAddress>(getDefaultAddress());

    const accountPrivilege: UserAccountPrivilege | null =
        useLoggedInUserAccountPrivilege();
    const [loadError, setLoadError] = useState<string>(
        accountPrivilege && accountPrivilege.admin
            ? ""
            : "Insufficient Privileges"
    );

    const accounts = useAccounts(
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
                <h2>Users</h2>
                <p>Loading users...</p>
            </Container>
        );
    }

    return (
        <Container className="mt-3">
            <h2>Users</h2>
            {loadError ? (
                <Alert variant="danger">
                    {loadError} - Failed to load users
                </Alert>
            ) : (
                <Table striped className="mt-2">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Email</th>
                            <th>Name</th>
                            <th>Info</th>
                        </tr>
                    </thead>
                    <tbody>
                        {accounts.map((account, index) => {
                            return (
                                <tr key={index}>
                                    <td>#{index}</td>
                                    <td>{account.data.email}</td>
                                    <td>{account.data.name}</td>
                                    <td>
                                        <Button
                                            size="sm"
                                            className="me-2"
                                            variant="info"
                                            onClick={() => {
                                                setPaymentView(true);
                                                setPayment(
                                                    firstPayment(account.data)
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
                                                    firstAddress(account.data)
                                                );
                                            }}
                                        >
                                            Shipping
                                        </Button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            )}
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
