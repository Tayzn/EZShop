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
                {window.innerWidth > 850 ? (
                    <a
                        href="https://github.com/Tayzn/275-Final-Project/"
                        style={{ paddingRight: "10px" }}
                    >
                        CISC275 Final Project | Team 4 : Tyler Nauta, Paul
                        Kearney, Matt Meredith, Nick Lago, Evan Lewis, Kay Sousa
                    </a>
                ) : (
                    <a
                        href="https://github.com/Tayzn/275-Final-Project/"
                        style={{ paddingRight: "10px" }}
                    >
                        CISC275 Final Project | Team 4
                    </a>
                )}
            </Navbar.Collapse>
        </Navbar>
    );
};
