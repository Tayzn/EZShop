import React from "react";

import { render, screen } from "@testing-library/react";
import { initializeFirebase } from "../firebase/firebase";
import { act } from "react-dom/test-utils";
import { AuthComponent } from "./AuthComponent";

initializeFirebase(false);

describe("Login Tests", () => {
    it("Authentication popup can be rendered with user", async () => {
        await act(async () => {
            render(<AuthComponent />);
        });
    });

    it("Can login or create an account", async () => {
        await act(async () => {
            render(<AuthComponent />);
        });

        const loginButton = screen.getByRole("button", { name: /sign in/i });
        const createButton = screen.getByRole("button", {
            name: /create an account/i
        });

        expect(loginButton).toBeInTheDocument();
        expect(createButton).toBeInTheDocument();

        createButton.click();

        const newAccountButton = screen.getByRole("button", {
            name: /create account/i
        });

        expect(newAccountButton).toBeInTheDocument();
    });

    it("Forms for entering email and password", async () => {
        await act(async () => {
            render(<AuthComponent />);
        });

        const loginButton = screen.getByRole("button", { name: /sign in/i });
        loginButton.click();

        const emailText = screen.getByText(/email/i);
        const passwordText = screen.getByText(/password/i);

        expect(emailText).toBeInTheDocument();
        expect(passwordText).toBeInTheDocument();
    });
});
