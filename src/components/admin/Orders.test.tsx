import React from "react";

import { render, screen } from "@testing-library/react";
import { initializeFirebase } from "../../firebase/firebase";
import { act } from "react-dom/test-utils";
import { AdminOrders } from "./AdminOrders";
import { BasicDisplayCard } from "../cart/BasicDisplayCard";
import { ViewPayment } from "./ViewPayment";
import { getDefaultPayment } from "../../interface/account";

initializeFirebase(false);

const dummyProduct = {
    name: "Dummy",
    category: "Dummy Category",
    description: "Dummy Description",
    price: 1000,
    stock: 100,
    variants: {
        color: ["Red", "Blue", "Green"],
        size: ["Small", "Medium", "Large"],
        material: ["Cotton", "Polyester", "Nylon"]
    },
    image: ""
};

describe("Order Flow Tests", () => {
    it("Orders Page can be rendered with database", async () => {
        await act(async () => {
            render(<AdminOrders />);
        });
    });

    it("Cart items can be displayed properly in the order", async () => {
        await act(async () => {
            render(
                <BasicDisplayCard
                    item={{
                        product: dummyProduct,
                        quantity: 1,
                        variants: {
                            color: "Red",
                            size: "Medium",
                            material: "Cotton"
                        }
                    }}
                />
            );
        });

        const colorText = screen.getByText(/red/i);
        const sizeText = screen.getByText(/medium/i);
        const materialText = screen.getByText(/cotton/i);
        const nameText = screen.getByText(/dummy/i);

        expect(colorText).toBeInTheDocument();
        expect(sizeText).toBeInTheDocument();
        expect(materialText).toBeInTheDocument();
        expect(nameText).toBeInTheDocument();
    });

    it("Admins can review the order payment method", async () => {
        await act(async () => {
            render(
                <ViewPayment
                    paymentView={true}
                    setPaymentView={(boolean) => {
                        console.log(boolean);
                    }}
                    payment={getDefaultPayment()}
                />
            );
        });

        const paymentText = screen.getByText(/payment info/i);
        const cardholderText = screen.getByText(/cardholder/i);
        const cardnumber = screen.getByText(/card number/i);

        expect(paymentText).toBeInTheDocument();
        expect(cardholderText).toBeInTheDocument();
        expect(cardnumber).toBeInTheDocument();
    });
});
