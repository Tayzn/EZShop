import React, { useState, useEffect } from "react";

import { Container, Alert, Table, Button, Form } from "react-bootstrap";
import {
    UserAddress,
    UserPayment,
    firstAddress,
    firstPayment,
    useAccounts,
    getDefaultPayment,
    getDefaultAddress,
    UserAccountPrivilege,
    isAdmin,
    UserAccount
} from "../../interface/account";
import { ViewPayment } from "./ViewPayment";
import { ViewShipping } from "./ViewShipping";
import { useLoggedInUserAccountPrivilege } from "../../firebase/firebase_auth";
import { AccountData, ReferencedObject } from "../../firebase/firebase_data";

interface Admins {
    [email: string]: ReferencedObject<UserAccountPrivilege> | null;
}

export const AdminUsers = (): JSX.Element => {
    const [loaded, setLoaded] = useState<boolean>(false);
    const [paymentView, setPaymentView] = useState<boolean>(false);
    const [payment, setPayment] = useState<UserPayment>(getDefaultPayment());
    const [shipView, setShipView] = useState<boolean>(false);
    const [shipping, setShipping] = useState<UserAddress>(getDefaultAddress());
    const [admins, setAdmins] = useState<Admins>({});

    const accountPrivilege: UserAccountPrivilege | null =
        useLoggedInUserAccountPrivilege();
    const [loadError, setLoadError] = useState<string>(
        accountPrivilege && accountPrivilege.admin
            ? ""
            : "Insufficient Privileges"
    );

    const updateAdmins = (
        account: ReferencedObject<UserAccount>,
        email = account.data.email
    ): void => {
        isAdmin(account)
            .then((priv) => {
                setAdmins((prevAdmins) => ({
                    ...prevAdmins,
                    [email]: priv
                }));
            })
            .catch(() => {
                setAdmins((prevAdmins) => ({
                    ...prevAdmins,
                    [email]: null
                }));
            });
    };

    const accounts = useAccounts(
        [],
        () => setLoaded(true),
        (reason) => {
            setLoaded(true);
            setLoadError(reason);
        }
    );

    useEffect(() => {
        accounts.forEach((account) => updateAdmins(account));
    }, [accounts]);

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
                            <th>Admin</th>
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
                                    <td>
                                        {admins[account.data.email] ? (
                                            <Form>
                                                <Form.Check
                                                    disabled={
                                                        account.data.email ===
                                                        "admin@admin.com"
                                                    }
                                                    label={
                                                        account.data.email ===
                                                        "admin@admin.com"
                                                            ? "Locked"
                                                            : ""
                                                    }
                                                    checked={
                                                        admins[
                                                            account.data.email
                                                        ]?.data.admin
                                                    }
                                                    onChange={(e) => {
                                                        if (
                                                            account.data
                                                                .email ===
                                                            "admin@admin.com"
                                                        ) {
                                                            return;
                                                        }
                                                        const priv: ReferencedObject<UserAccountPrivilege> | null =
                                                            admins[
                                                                account.data
                                                                    .email
                                                            ];

                                                        if (priv != null) {
                                                            priv.data.admin =
                                                                e.target.checked;
                                                            AccountData.updatePrivilege(
                                                                priv
                                                            ).then(() =>
                                                                updateAdmins(
                                                                    account
                                                                )
                                                            );
                                                        }
                                                    }}
                                                />
                                            </Form>
                                        ) : (
                                            "Error"
                                        )}
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
