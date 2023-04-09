import React from "react";
import { AuthComponent } from "./AuthComponent";

export const HeaderNav = (): JSX.Element => {
    return (
        <div style={{ height: "5%", backgroundColor: "#a1f79f" }}>
            <AuthComponent />
        </div>
    );
};
