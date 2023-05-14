import React from "react";

import { render, screen } from "@testing-library/react";
import { initializeFirebase } from "../../firebase/firebase";
import { act } from "react-dom/test-utils";
import { ConfirmationPage } from "../ConfirmationPage";
import { PaymentModal } from "./PaymentModal";
import { getDefaultPayment } from "../../interface/account";

const mockedUsedLocation = jest.fn();
jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useLocation: () => mockedUsedLocation
}));

initializeFirebase(false);

describe("Checkout Tests", () => {
    it("Confirmation page renders with cart", async () => {
        await act(async () => {
            render(<ConfirmationPage />);
        });
    });

    it("Confirmation page displays correct text and buttons", async () => {
        await act(async () => {
            render(<ConfirmationPage />);
        });

        const receiptText = screen.getByText(/receipt/i);
        const homeButton = screen.getByRole("button", { name: /return home/i });

        expect(receiptText).toBeInTheDocument();
        expect(homeButton).toBeInTheDocument();
    });

    it("Payment modal display correctly text and buttons", async () => {
        await act(async () => {
            render(
                <PaymentModal
                    user={false}
                    confirmation={true}
                    setConfirmation={(boolean) => {
                        console.log(boolean);
                    }}
                    submitOrder={() => {
                        console.log("submit");
                    }}
                    payment={getDefaultPayment()}
                    setPayment={(payment) => {
                        console.log(payment);
                    }}
                    savePayment={false}
                    setSavePayment={(boolean) => {
                        console.log(boolean);
                    }}
                />
            );
        });

        const headerText = screen.getByText(/confirm payment information/i);
        const cardholder = screen.getByText(/cardholder/i);
        const payButton = screen.getByRole("button", { name: /submit order/i });

        expect(headerText).toBeInTheDocument();
        expect(cardholder).toBeInTheDocument();
        expect(payButton).toBeInTheDocument();
    });
});
