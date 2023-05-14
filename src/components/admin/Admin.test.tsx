import React from "react";

import { render, screen } from "@testing-library/react";
import { initializeFirebase } from "../../firebase/firebase";
import { AdminPage } from "./AdminPage";
import { act } from "react-dom/test-utils";

initializeFirebase(false);

describe("Admin Tests", () => {
    it("Admin Page can be rendered with database", async () => {
        await act(async () => {
            render(<AdminPage />);
        });
    });

    it("Displays dashboard buttons correctly", async () => {
        await act(async () => {
            render(<AdminPage />);
        });

        const invButton = screen.getByRole("button", { name: /inventory/i });
        const orderButton = screen.getByRole("button", { name: /orders/i });
        const userButton = screen.getByRole("button", { name: /users/i });

        expect(invButton).toBeInTheDocument();
        expect(orderButton).toBeInTheDocument();
        expect(userButton).toBeInTheDocument();
    });

    it("Dashboard buttons bring up correct displays when clicked", async () => {
        await act(async () => {
            render(<AdminPage />);
        });

        const invButton = screen.getByRole("button", {
            name: /inventory/i
        });
        const orderButton = screen.getByRole("button", { name: /orders/i });
        const userButton = screen.getByRole("button", { name: /users/i });

        let searchText = screen.getByText(/load inventory/i);
        expect(searchText).toBeInTheDocument();

        await act(async () => {
            orderButton.click();
        });

        searchText = screen.getByText(/load orders/i);
        expect(searchText).toBeInTheDocument();

        await act(async () => {
            userButton.click();
        });

        searchText = screen.getByText(/loading users/i);
        expect(searchText).toBeInTheDocument();

        await act(async () => {
            invButton.click();
        });

        searchText = screen.getByText(/load inventory/i);
        expect(searchText).toBeInTheDocument();
    });
});
