import React from "react";

import { render, screen } from "@testing-library/react";
import { initializeFirebase } from "../../firebase/firebase";
import { act } from "react-dom/test-utils";
import { ConfirmationPage } from "../ConfirmationPage";
import { PaymentModal } from "./PaymentModal";
import { getDefaultPayment } from "../../interface/account";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import App from "../../App";

const mockedUsedLocation = jest.fn();

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useLocation: () => mockedUsedLocation
}));
jest.mock("../../interface/order.ts", () => ({
    __esModule: true,
    useOrder: () => ({
        data: {
            date: new Date(),
            items: [],
            user: "anonymous",
            status: "pending",
            address: {
                addr1: "123 st st",
                addr2: null,
                city: "newark",
                state: "de",
                zip: "19713"
            },
            payment: {
                cardholderName: "test cardholder",
                cardNumber: "1234567887654321",
                cvv: "123",
                expiration: new Date(),
                zip: "19713"
            }
        },
        reference: null
    })
}));

const renderWithRouter = (ui: JSX.Element, { route = "/" } = {}) => {
    window.history.pushState({}, "Test page", route);

    return render(ui, { wrapper: BrowserRouter });
};

initializeFirebase(false);

describe("Checkout Tests", () => {
    it("Confirmation page renders with cart", async () => {
        await act(async () => {
            render(<ConfirmationPage />);
        });
    });

    it("Confirmation page displays correct text and buttons", async () => {
        await act(async () => {
            renderWithRouter(<App />, {
                route: "/confirmation/dummy"
            });
        });

        await new Promise<void>((r) => setTimeout(r, 1000));
        const receiptText = screen.getByText(/receipt/i);
        const homeButton = screen.getByRole("button", {
            name: /return home/i
        });

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
