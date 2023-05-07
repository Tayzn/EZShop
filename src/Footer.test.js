import React from "react";

import { render } from "@testing-library/react";
import { Footer } from "./components/Footer";

describe("Footer component", () => {
    it("footer renders without errors", () => {
        render(<Footer />);
    });
});

describe("Footer component", () => {
    it("renders the NavBar", () => {
        const { getByRole } = render(<Footer />);
        const navBar = getByRole("navigation");
        expect(navBar).toBeInTheDocument();
    });
});

describe("Footer component", () => {
    it("renders the NavBar with the correct text content", () => {
        const { getByText } = render(<Footer />);
        const navBar = getByText(
            "CISC275 Final Project | Team 4 : Tyler Nauta, Paul Kearney, Matt Meredith, Nick Lago, Evan Lewis, Kay Sousa"
        );

        expect(navBar).toBeInTheDocument();
    });
});

describe("Footer component", () => {
    it("renders the NavBar with the correct CSS", () => {
        const { getByRole } = render(<Footer />);
        const navBar = getByRole("navigation");
        expect(navBar).toHaveStyle("backgroundColor: #e6e6e6");
    });
});

describe("Footer component", () => {
    it("renders the NavBar with the EZShop Text in bottom left", () => {
        const { getByText } = render(<Footer />);
        const navBar = getByText("EZShop™");

        expect(navBar).toBeInTheDocument();
    });
});
