/**
 * Product Display Component
 * merematt@udel.edu & nlago@udel.edu
 * 4/9/2023
 */

import React, { useState } from "react";
import { Product } from "../../interface/product";
import { ReferencedObject } from "../../firebase/firebase_data";
import { Card, Image, Ratio, Container } from "react-bootstrap";
import { CatalogComponent } from "./CatalogComponent";
export interface ItemView {
    inspectItem: boolean;
    product: ReferencedObject<Product>;
    setInspectItem: (newInspectStatus: boolean) => void;
}
export function ProductDisplayComponent({
    product
}: {
    product: ReferencedObject<Product>;
}): JSX.Element {
    const [inspectItem, setInspectItem] = useState<boolean>(false);
    return (
        <>
            <Card
                className="item itemInspect"
                onClick={() => setInspectItem(true)}
            >
                <Card.Body>
                    <Ratio aspectRatio={"1x1"}>
                        <Container
                            fluid
                            className="d-flex align-items-center justify-content-center overflow-hidden"
                        >
                            <Image fluid src={product.data.image} />
                        </Container>
                    </Ratio>
                    <Card.Title>
                        {product.data.name}
                        <span className="category-label">
                            {" - "}
                            {product.data.category}
                        </span>
                    </Card.Title>
                    <Card.Subtitle>
                        $
                        {product.data.price.toLocaleString(undefined, {
                            minimumFractionDigits: 2
                        })}
                    </Card.Subtitle>
                    <br />
                </Card.Body>
            </Card>
            <CatalogComponent
                inspectItem={inspectItem}
                product={product}
                setInspectItem={setInspectItem}
            />
        </>
    );
}
