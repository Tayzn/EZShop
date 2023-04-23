import React from "react";

import { useState } from "react";

import { Container, ToggleButton, ButtonGroup } from "react-bootstrap";

import { AdminInventory } from "./AdminInventory";
import { AdminOrders } from "./AdminOrders";
import { AdminUsers } from "./AdminUsers";

const options = ["Inventory", "Orders", "Users"];

export const AdminPage = (): JSX.Element => {
    const [selectedOption, setSelectedOption] = useState("Inventory");
    return (
        <Container fluid className="flex-grow-1 ez-bg">
            <Container className="h-100 side-shadow">
                <h1 className="p-4">Admin Dashboard</h1>
                <hr></hr>
                <Container className="d-flex justify-content-center align-items-center">
                    <ButtonGroup>
                        {options.map((option, index) => (
                            <ToggleButton
                                key={index}
                                id={`option-${option}`}
                                type="radio"
                                variant={"outline-primary"}
                                name="option"
                                size="lg"
                                value={option}
                                checked={selectedOption === option}
                                onChange={(e) =>
                                    setSelectedOption(e.currentTarget.value)
                                }
                            >
                                {option}
                            </ToggleButton>
                        ))}
                    </ButtonGroup>
                </Container>
                {selectedOption === "Inventory" && <AdminInventory />}
                {selectedOption === "Orders" && <AdminOrders />}
                {selectedOption === "Users" && <AdminUsers />}
            </Container>
        </Container>
    );
};
