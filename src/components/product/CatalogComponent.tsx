import React from "react";
import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import { Image } from "react-bootstrap";
import { addToCart } from "../../interface/cart";
import { ItemView } from "../product/ProductDisplayComponent";
export function CatalogComponent({
    inspectItem,
    desiredVariant,
    setDesiredVariant,
    product,
    setInspectItem
}: ItemView): JSX.Element {
    return (
        <>
            <Modal
                show={inspectItem}
                onHide={() => setInspectItem(false)}
                size="lg"
            >
                <Modal.Header>
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
                                    <Form.Select
                                        value={desiredVariant}
                                        onChange={(
                                            event: React.ChangeEvent<HTMLSelectElement>
                                        ) =>
                                            setDesiredVariant(
                                                event.target.value
                                            )
                                        }
                                    >
                                        {product.data.variants != null ? (
                                            product.data.variants.name?.map(
                                                (variant) => (
                                                    <option
                                                        key={variant.name}
                                                        value={variant.name}
                                                    >
                                                        {variant.name}
                                                    </option>
                                                )
                                            )
                                        ) : (
                                            <option
                                                value={"No primary Variants"}
                                            >
                                                {"No primary Variants"}
                                            </option>
                                        )}
                                    </Form.Select>
                                </Row>
                            </Col>
                            <Row>
                                <Button
                                    variant="success"
                                    style={{
                                        width: "300px",
                                        marginLeft: "400px"
                                    }}
                                    onClick={() =>
                                        addToCart({
                                            product: product.data,
                                            quantity: 1,
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
