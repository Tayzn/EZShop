import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { FilterProp } from "./Inventory";
import { array } from "./product/ProductDisplayGrid";
export function Filter({
    setBackorder,
    setIsInStock,
    setCategory,
    setShowNoItemsFound,
    setMaxPriceFilter,
    setMinPriceFilter
}: FilterProp): JSX.Element {
    //these place holder states ensure that only on the onclick event on the "Apply" button on the filter modal, will the actual state of the item filter fields change. if cancel is
    //pressed, the filter fields will remain unchanged
    const [categoryPlaceHolder, setCategoryPlaceHolder] = useState("any");
    const [isInStockPlaceHolder, setIsInStockPlaceHolder] = useState(true);
    const [backorderPlaceHolder, setBackorderPlaceHolder] = useState(true);
    const [minpricePlaceHolder, setMinPriceFilterPlaceHolder] =
        useState<string>("0");
    const [maxpricePlaceHolder, setMaxPriceFilterPlaceHolder] =
        useState<string>("9999");
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const categories = array;
    function checkValidPrice() {
        if (
            parseInt(minpricePlaceHolder) < 0 ||
            parseInt(minpricePlaceHolder) > parseInt(maxpricePlaceHolder) ||
            parseInt(maxpricePlaceHolder) < parseInt(minpricePlaceHolder)
        ) {
            return false;
        }
        return true;
    }
    return (
        <>
            <Button
                variant="success"
                style={{
                    width: "60px",
                    marginLeft: "20px"
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
                        {categories.map((category: string) => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        ))}
                    </Form.Select>
                    <hr></hr>
                    <div className="priceFilter">
                        <Form.Group controlId="setMinPrice" className="me-2">
                            <Form.Label>Price Min:</Form.Label>
                            <Form.Control
                                value={minpricePlaceHolder}
                                style={{ width: "100px" }}
                                type="number"
                                onChange={(
                                    event: React.ChangeEvent<HTMLInputElement>
                                ) =>
                                    setMinPriceFilterPlaceHolder(
                                        event.target.value
                                    )
                                }
                            />
                        </Form.Group>
                        <Form.Group controlId="setMaxPrice">
                            <Form.Label>Price Max:</Form.Label>
                            <Form.Control
                                type="number"
                                style={{ width: "100px" }}
                                value={maxpricePlaceHolder}
                                onChange={(
                                    event: React.ChangeEvent<HTMLInputElement>
                                ) =>
                                    setMaxPriceFilterPlaceHolder(
                                        event.target.value
                                    )
                                }
                            />
                        </Form.Group>
                    </div>
                    <span hidden={checkValidPrice()}>
                        Please enter a valid price Filter
                    </span>
                    <hr></hr>
                    Availability:
                    <h1></h1>
                    <Form.Check
                        inline
                        label="In-stock "
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
                        label="Backorder"
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
                        disabled={!checkValidPrice()}
                        onClick={() => {
                            handleClose();
                            setCategory(categoryPlaceHolder);
                            setBackorder(backorderPlaceHolder);
                            setIsInStock(isInStockPlaceHolder);
                            setShowNoItemsFound(false);
                            setMaxPriceFilter(maxpricePlaceHolder);
                            setMinPriceFilter(minpricePlaceHolder);
                        }}
                    >
                        Apply
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
