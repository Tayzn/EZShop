import React from "react";

import { render, screen } from "@testing-library/react";
import { CartPage } from "./CartPage";
import { initializeFirebase } from "../../firebase/firebase";
import { act } from "react-dom/test-utils";

const mockedUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => mockedUsedNavigate
}));

initializeFirebase(false);

describe("Cart Tests", () => {
    it("Cart can be rendered with database", async () => {
        await act(async () => {
            render(<CartPage />);
        });
    });

    it("Cart properly displays shipping info", async () => {
        await act(async () => {
            render(<CartPage />);
        });
        const totalText = screen.getByText(/total/i);
        const payButton = screen.getByRole("button", { name: /payment/i });

        expect(totalText).toBeInTheDocument();
        expect(payButton).toBeInTheDocument();
    });

    it("Can select different shipping options", async () => {
        await act(async () => {
            render(<CartPage />);
        });
        const deliveryButton = screen.getByRole("radio", {
            name: /Express Delivery/i
        });

        expect(deliveryButton).toBeInTheDocument();
        expect(deliveryButton).not.toBeChecked();

        deliveryButton.click();

        expect(deliveryButton).toBeChecked();
    });
});
