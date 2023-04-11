import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { propData } from "./Inventory";

export function Filter({
    setBackorder,
    setIsInStock,
    setCategory
}: propData): JSX.Element {
    //these place holder states ensure that only on the onclick event on the "Apply" button on the filter modal, will the actual state of the item filter fields change. if cancel is
    //pressed, the filter fields will remain unchanged
    const [categoryPlaceHolder, setCategoryPlaceHolder] = useState("any");
    const [isInStockPlaceHolder, setIsInStockPlaceHolder] = useState(true);
    const [backorderPlaceHolder, setBackorderPlaceHolder] = useState(false);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const categories = ["any", "books", "pen/pencils", "lights", "automotive"];
    const [minprice, setMinPriceFilter] = useState<string>("0");
    const [maxprice, setMaxPriceFilter] = useState<string>("9999");

    return (
        <>
            <Button
                variant="success"
                style={{
                    width: "60px"
                }}
                onClick={handleShow}
            >
                Filter
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Filter</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Category:
                    <Form.Select
                        value={categoryPlaceHolder}
                        onChange={(
                            event: React.ChangeEvent<HTMLSelectElement>
                        ) => setCategoryPlaceHolder(event.target.value)}
                    >
                        {categories.map((color: string) => (
                            <option key={color} value={color}>
                                {color}
                            </option>
                        ))}
                    </Form.Select>
                    <hr></hr>
                    Price:
                    <div className="priceFilter">
                        <Form.Group controlId="setMinPrice">
                            <Form.Control
                                value={minprice}
                                style={{ width: "100px" }}
                                type="number"
                                onChange={(
                                    event: React.ChangeEvent<HTMLInputElement>
                                ) => setMinPriceFilter(event.target.value)}
                            />
                        </Form.Group>
                        <span
                            style={{
                                paddingRight: "20px",
                                paddingLeft: "20px"
                            }}
                        >
                            to
                        </span>
                        <Form.Group controlId="setMaxPrice">
                            <Form.Control
                                type="number"
                                style={{ width: "100px" }}
                                value={maxprice}
                                onChange={(
                                    event: React.ChangeEvent<HTMLInputElement>
                                ) => setMaxPriceFilter(event.target.value)}
                            />
                        </Form.Group>
                    </div>
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
                        ) => setIsInStockPlaceHolder(event.target.checked)}
                        id="filter-in-stock"
                        value="in-stock"
                        checked={isInStockPlaceHolder}
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
                        name="backorder"
                        onChange={(
                            event: React.ChangeEvent<HTMLInputElement>
                        ) => setBackorderPlaceHolder(event.target.checked)}
                        id="filter-out-stock"
                        value="backorder"
                        checked={backorderPlaceHolder}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button
                        variant="success"
                        onClick={() => {
                            handleClose();
                            setCategory(categoryPlaceHolder);
                            setBackorder(backorderPlaceHolder);
                            setIsInStock(isInStockPlaceHolder);
                        }}
                    >
                        Apply
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
