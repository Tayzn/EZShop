import React from "react";

export const Footer = (): JSX.Element => {
    return (
        <div
            className="d-flex"
            style={{
                backgroundColor: "#e6e6e6",
                height: "3%",
                justifyContent: "space-between"
            }}
        >
            <p
                style={{ fontWeight: "500", textAlign: "left" }}
                className="mx-2"
            >
                EZShop™
            </p>
            <a
                href="https://github.com/Tayzn/275-Final-Project/"
                style={{ fontWeight: "100", textAlign: "right" }}
                className="mx-2"
            >
                CISC275 Final Project | Team 4 : Tyler Nauta, Paul Kearney, Matt
                Meredith, Nick Lago, Evan Lewis, Kay Sousa
            </a>
        </div>
    );
};
