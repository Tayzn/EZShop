/**
 * Product Display Component
 * merematt@udel.edu & nlago@udel.edu
 * 4/9/2023
 */

import React, { useState } from "react";
import { Product } from "../../interface/product";
import { ReferencedObject } from "../../firebase/firebase_data";
import { Card } from "react-bootstrap";
import { Image } from "react-bootstrap";
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
            <Card className="item">
                <Card.Body>
                    <div
                        className="itemInspect"
                        onClick={() => setInspectItem(true)}
                    >
                        <Image
                            thumbnail
                            width="100%"
                            height="auto"
                            src={product.data.image}
                        />
                        <Card.Title>{product.data.name}</Card.Title>
                        <Card.Subtitle>{product.data.category}</Card.Subtitle>
                        <br />
                    </div>
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
