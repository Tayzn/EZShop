import React from "react";

import { render, screen } from "@testing-library/react";
import { initializeFirebase } from "../firebase/firebase";
import { act } from "react-dom/test-utils";
import { Inventory } from "./Inventory";

initializeFirebase(false);

describe("Inventory Tests", () => {
    it("Inventory Page can be rendered with database", async () => {
        await act(async () => {
            render(<Inventory />);
        });
    });

    it("Inventory text and buttons display correctly", async () => {
        await act(async () => {
            render(<Inventory />);
        });

        const catalogText = screen.getByText(/catalog/i);
        const filterButton = screen.getByRole("button", { name: /filter/i });

        expect(catalogText).toBeInTheDocument();
        expect(filterButton).toBeInTheDocument();
    });

    it("Inventory can be filtered", async () => {
        await act(async () => {
            render(<Inventory />);
        });

        const filterButton = screen.getByRole("button", { name: /filter/i });

        filterButton.click();

        const catText = screen.getByText(/category/i);
        const availText = screen.getByText(/availability/i);
        const applyButton = screen.getByRole("button", {
            name: /apply/i
        });

        expect(catText).toBeInTheDocument();
        expect(availText).toBeInTheDocument();
        expect(applyButton).toBeInTheDocument();
    });
});
