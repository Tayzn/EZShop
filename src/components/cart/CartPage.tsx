import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { Container, Col, Button } from "react-bootstrap";
import { placeOrder, useCart } from "../../interface/cart";

import { CartItemDisplay } from "./CartItemDisplay";
import { ShippingForm } from "./ShippingForm";
import { OrderModal } from "./OrderModal";
import { PaymentModal } from "./PaymentModal";

import {
    useLoggedInUser,
    useLoggedInUserAccount
} from "../../firebase/firebase_auth";
import { User } from "firebase/auth";
import {
    UserAddress,
    UserAccount,
    UserPayment,
    firstAddress,
    firstPayment
} from "../../interface/account";

export const CartPage = (): JSX.Element => {
    const cart = useCart();
    const user: User | null = useLoggedInUser();
    const account: UserAccount | null = useLoggedInUserAccount();
    const [shippingOption, setShippingOption] = useState<string>("standard");
    const [total, setTotal] = useState<number>(0.0);
    const [orderComplete, setOrderComplete] = useState<boolean>(false);
    const [orderFailureReason, setOrderFailureReason] = useState<
        string | undefined
    >(undefined);
    const [confirmation, setConfirmation] = useState<boolean>(false);
    const [address, setAddress] = useState<UserAddress>(firstAddress(account));
    const [payment, setPayment] = useState<UserPayment>(firstPayment(account));
    const [saveShipping, setSaveShipping] = useState<boolean>(true);
    const [savePayment, setSavePayment] = useState<boolean>(true);

    useEffect(() => {
        setAddress(firstAddress(account));
        setPayment(firstPayment(account));
    }, [account]);

    useEffect(() => calculateTotal(), [cart, shippingOption]);

    const navigate = useNavigate();

    const standardShippingPercent = 5;
    const expressShippingPercent = 8;

    const calculateTotal = () => {
        const cartTotal: number = cart.items.reduce(
            (sum, item) => (sum += item.product.data.price * item.quantity),
            0
        );

        const shippingPrice =
            shippingOption === "standard"
                ? cartTotal * (standardShippingPercent / 100)
                : cartTotal * (expressShippingPercent / 100);
        setTotal(cartTotal + shippingPrice);
    };

    const submitOrder = () => {
        setConfirmation(false);
        placeOrder(user, address, payment, saveShipping, savePayment)
            .then((createdOrder) => {
                setTimeout(
                    () =>
                        navigate(`/confirmation/${createdOrder.reference.id}`),
                    1500
                );
            })
            .catch((reason) => {
                setOrderFailureReason(reason);
            })
            .finally(() => setOrderComplete(true));
    };

    return (
        <Container fluid className="flex-grow-1 ez-bg">
            <Container className="h-100 side-shadow">
                <h1 className="p-4">Your Cart</h1>
                <hr></hr>
                <Container className="d-flex flex-row">
                    <Col xs={8}>
                        {cart.items.map((item, idx) => (
                            <CartItemDisplay key={idx} item={item} />
                        ))}
                    </Col>
                    <Col xs={1}>
                        <></>
                    </Col>
                    <Col>
                        <Container
                            className="p-3"
                            style={{ backgroundColor: "#e6e6e6" }}
                        >
                            <h2>
                                Total:{" "}
                                {cart.items.length === 0
                                    ? "$0.00"
                                    : "$" +
                                      total.toLocaleString(undefined, {
                                          minimumFractionDigits: 2
                                      })}
                            </h2>
                            <hr></hr>
                            <div className="mt-4">
                                <ShippingForm
                                    user={user !== null}
                                    shippingOption={shippingOption}
                                    setShippingOption={setShippingOption}
                                    standardShippingPercent={
                                        standardShippingPercent
                                    }
                                    expressShippingPercent={
                                        expressShippingPercent
                                    }
                                    address={address}
                                    setAddress={setAddress}
                                    saveShipping={saveShipping}
                                    setSaveShipping={setSaveShipping}
                                />
                            </div>
                            <Button
                                variant="success"
                                size="lg"
                                disabled={
                                    cart.items.length === 0 ||
                                    address.addr1 === "" ||
                                    address.city === "" ||
                                    address.state === "" ||
                                    address.zip === ""
                                }
                                onClick={() => setConfirmation(true)}
                            >
                                Payment »
                            </Button>
                        </Container>
                    </Col>
                </Container>
                <OrderModal
                    orderComplete={orderComplete}
                    orderFailReason={orderFailureReason}
                    orderReset={() => setOrderComplete(false)}
                />
                <PaymentModal
                    user={user !== null}
                    confirmation={confirmation}
                    setConfirmation={setConfirmation}
                    submitOrder={submitOrder}
                    payment={payment}
                    setPayment={setPayment}
                    savePayment={savePayment}
                    setSavePayment={setSavePayment}
                />
            </Container>
        </Container>
    );
};
