import React from "react";
import { AuthComponent } from "./AuthComponent";

interface HeaderNavProps {
    setCartView: React.Dispatch<React.SetStateAction<boolean>>;
}

export const HeaderNav = ({ setCartView }: HeaderNavProps): JSX.Element => {
    return (
        <div
            className="d-flex"
            style={{ height: "5%", backgroundColor: "#a1f79f" }}
        >
            <AuthComponent />
            <button onClick={() => setCartView(true)}>Test</button>
        </div>
    );
};
