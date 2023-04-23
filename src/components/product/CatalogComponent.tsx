import React, { useState } from "react";
import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import { Image } from "react-bootstrap";
import { addToCart } from "../../interface/cart";
import { ItemView } from "../product/ProductDisplayComponent";
//import { ProductVariantSelection } from "../../interface/product";
export function CatalogComponent({
    inspectItem,
    product,
    setInspectItem
}: ItemView): JSX.Element {
    const [quantity, setQuantity] = useState<string>("1");
    //const [variants, setVariants] = useState<ProductVariantSelection>({});
    function checkValidQuantity() {
        if (
            parseInt(quantity) > product.data.stock ||
            parseInt(quantity) <= 0
        ) {
            return true;
        }
        return false;
    }
    function test() {
        let test = "";
        for (const key in product.data.variants) {
            test = key;
        }
        return test;
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
                                <Image
                                    height="300px"
                                    width="300px"
                                    src="https://i.ibb.co/Z8mKr4f/boxclipart.png"
                                />
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
                                    Options:
                                    <p></p>
                                    Available Variants:
                                    <p></p>
                                    {test()}
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
                                            variants: {}
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
