import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
export function Filter(): JSX.Element {
    //below are just place holder item fields
    const [filterVisible, setFilterVisible] = useState(false);
    const colors = ["any", "red", "blue", "pink"];
    const sizes = ["any", "small", "medium", "large"];
    const [color, setColor] = useState("any");
    const [size, setSize] = useState("any");
    const [isInStock, setIsInStock] = useState(true);
    const [backorder, setBackorder] = useState(false);
    //All css went into App.css
    return (
        <div>
            <Button
                className="filter-button"
                onClick={() => setFilterVisible(true)}
            >
                Filter
            </Button>
            <div className="outcrop" hidden={!filterVisible}>
                <div className="popup" id="pop" hidden={!filterVisible}>
                    <h1>Filter</h1>
                    <hr></hr>
                    <span>
                        Color:
                        <Form.Select
                            value={color}
                            onChange={(
                                event: React.ChangeEvent<HTMLSelectElement>
                            ) => setColor(event.target.value)}
                        >
                            {colors.map((color: string) => (
                                <option key={color} value={color}>
                                    {color}
                                </option>
                            ))}
                        </Form.Select>
                        <hr></hr>
                        Size:
                        <Form.Select
                            value={size}
                            onChange={(
                                event: React.ChangeEvent<HTMLSelectElement>
                            ) => setSize(event.target.value)}
                        >
                            {sizes.map((size: string) => (
                                <option key={size} value={size}>
                                    {size}
                                </option>
                            ))}
                        </Form.Select>
                        <hr></hr>
                        Availability:
                        <h1></h1>
                        <Form.Check
                            inline
                            label="in-stock "
                            style={{
                                position: "relative",
                                display: "inline-block",
                                top: "5%"
                            }}
                            type="checkbox"
                            name="in-stock"
                            onChange={(
                                event: React.ChangeEvent<HTMLInputElement>
                            ) => setIsInStock(event.target.checked)}
                            id="filter-in-stock"
                            value="in-stock"
                            checked={isInStock}
                        />
                        <Form.Check
                            inline
                            label="backorder"
                            style={{
                                position: "relative",
                                display: "inline-block",
                                top: "5%"
                            }}
                            type="checkbox"
                            name="in-stock"
                            onChange={(
                                event: React.ChangeEvent<HTMLInputElement>
                            ) => setBackorder(event.target.checked)}
                            id="filter-out-stock"
                            value="in-stock"
                            checked={backorder}
                        />
                    </span>
                    <Button
                        className="popup-close-button"
                        onClick={() => setFilterVisible(false)}
                    >
                        Close & Apply
                    </Button>
                </div>
            </div>
        </div>
    );
}
