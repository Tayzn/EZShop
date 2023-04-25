/**
 * Product Display Component
 * merematt@udel.edu & nlago@udel.edu
 * 4/9/2023
 */

import React, { useState } from "react";
import { Product } from "../../interface/product";
import { ReferencedObject } from "../../firebase/firebase_data";
import { Card, Image, Ratio } from "react-bootstrap";
import { CatalogComponent } from "./CatalogComponent";

export interface ItemView {
    inspectItem: boolean;
    desiredVariant: string;
    setDesiredVariant: (newDesiredVariant: string) => void;
    product: ReferencedObject<Product>;
    setInspectItem: (newInspectStatus: boolean) => void;
}
export function ProductDisplayComponent({
    product
}: {
    product: ReferencedObject<Product>;
}): JSX.Element {
    const [inspectItem, setInspectItem] = useState<boolean>(false);
    const [desiredVariant, setDesiredVariant] = useState("test");

    return (
        <>
            <Card
                className="item itemInspect"
                onClick={() => setInspectItem(true)}
            >
                <Card.Body>
                    <Ratio aspectRatio={"1x1"}>
                        <Image fluid src={product.data.image} />
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
                desiredVariant={desiredVariant}
                setDesiredVariant={setDesiredVariant}
                product={product}
                setInspectItem={setInspectItem}
            />
        </>
    );
}
