import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import { Image, Ratio } from "react-bootstrap";
import { addToCart } from "../../interface/cart";
import { ItemView } from "../product/ProductDisplayComponent";
import { ProductVariantSelection } from "../../interface/product";

export function CatalogComponent({
    inspectItem,
    product,
    setInspectItem
}: ItemView): JSX.Element {
    const [variantSelection, setVariantSelection] =
        useState<ProductVariantSelection>({});
    const [quantity, setQuantity] = useState<string>("1");
    const [optionsAvailable, setOptionsAvailable] = useState<boolean>(false);
    useEffect(() => {
        setDefaultSelection();
    }, []);
    function setDefaultSelection() {
        //defaults to first in variant selection
        const temp = {};
        Object.entries(product.data.variants).forEach(([key]) => {
            Object.assign(temp, { [key]: product.data.variants[key][0] });
            setOptionsAvailable(true);
        });
        setVariantSelection(temp);
    }
    function checkValidQuantity() {
        if (
            parseInt(quantity) > product.data.stock ||
            parseInt(quantity) <= 0
        ) {
            return true;
        }
        return false;
    }
    function mapOptions() {
        const options: JSX.Element[] = [];
        Object.entries(product.data.variants).forEach(([key]) => {
            options.push(
                <>
                    {[key]}
                    <Form.Select
                        value={variantSelection[key]}
                        onChange={(
                            event: React.ChangeEvent<HTMLSelectElement>
                        ) => {
                            const temp = {};
                            Object.entries(variantSelection).map(([group1]) => {
                                if (group1 !== key) {
                                    Object.assign(temp, {
                                        [group1]: variantSelection[group1]
                                    });
                                }
                            });
                            setVariantSelection(
                                Object.assign(temp, {
                                    [key]: event.target.value
                                })
                            );
                        }}
                    >
                        {product.data.variants[key].map((option: string) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </Form.Select>
                    <p></p>
                </>
            );
        });
        return options;
    }
    return (
        <>
            <Modal
                show={inspectItem}
                onHide={() => setInspectItem(false)}
                size="lg"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>{product.data.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <Row>
                            <Col>
                                <Ratio aspectRatio={"1x1"}>
                                    <Container
                                        fluid
                                        className="d-flex align-items-center justify-content-center overflow-hidden"
                                    >
                                        <Image fluid src={product.data.image} />
                                    </Container>
                                </Ratio>
                                <p></p>
                                Description:
                                <p></p>
                                {product.data.description}
                            </Col>
                            <Col>
                                <Row>Price: ${product.data.price}</Row>
                                <p></p>
                                <Row>Stock: {product.data.stock}</Row>
                                <p></p>
                                <Row>
                                    <>
                                        {optionsAvailable === true ? (
                                            <>Options</>
                                        ) : (
                                            <>This Product has no variants</>
                                        )}
                                    </>
                                    <p></p>
                                    {mapOptions()}
                                    <p></p>
                                    Quantity:
                                    <Form.Group controlId="setMaxPrice">
                                        <Form.Control
                                            type="number"
                                            style={{ width: "100px" }}
                                            value={quantity}
                                            onChange={(
                                                event: React.ChangeEvent<HTMLInputElement>
                                            ) =>
                                                setQuantity(event.target.value)
                                            }
                                        />
                                    </Form.Group>
                                    <span hidden={!checkValidQuantity()}>
                                        Not a Valid Quantity!
                                    </span>
                                </Row>
                            </Col>
                            <Row>
                                <Button
                                    variant="success"
                                    disabled={checkValidQuantity()}
                                    style={{
                                        width: "300px",
                                        marginLeft: "400px"
                                    }}
                                    onClick={() =>
                                        addToCart({
                                            product: product.data,
                                            quantity: parseInt(quantity),
                                            variants: variantSelection
                                        })
                                    }
                                >
                                    Add to Cart
                                </Button>
                            </Row>
                        </Row>
                    </Container>
                </Modal.Body>
            </Modal>
        </>
    );
}
