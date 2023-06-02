import React from "react";
import Navbar from "react-bootstrap/Navbar";

export const Footer = (): JSX.Element => {
    return (
        <Navbar
            style={{
                backgroundColor: "#e6e6e6"
            }}
        >
            <div style={{ paddingLeft: "10px" }}>EZShop™</div>

            <Navbar.Collapse className="justify-content-end">
                <a
                    href="https://github.com/Tayzn/EZShop/"
                    style={{ paddingRight: "10px" }}
                >
                    Source Code
                </a>
            </Navbar.Collapse>
        </Navbar>
    );
};
