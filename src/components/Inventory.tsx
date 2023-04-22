import React, { useState } from "react";
import { Container, Row } from "react-bootstrap";
import { Filter } from "./Filter";
import { ProductDisplayGrid } from "./product/ProductDisplayGrid";
import { SearchBar } from "./SearchBar";

export interface FilterProp {
    category: string;
    isInStock: boolean;
    backorder: boolean;
    setCategory: (newCategory: string) => void;
    setBackorder: (newback: boolean) => void;
    setIsInStock: (newstock: boolean) => void;
    setShowNoItemsFound: (displayNoItemsFound: boolean) => void;
    setMaxPriceFilter: (MaxPrice: string) => void;
    setMinPriceFilter: (MinPrice: string) => void;
}
export const Inventory = (): JSX.Element => {
    const [category, setCategory] = useState("any");
    const [isInStock, setIsInStock] = useState(true);
    const [backorder, setBackorder] = useState(true);
    const [currentSearch, setCurrentSearch] = useState("");
    const [showNoItemsFound, setShowNoItemsFound] = useState(true);
    const [minprice, setMinPriceFilter] = useState<string>("0");
    const [maxprice, setMaxPriceFilter] = useState<string>("9999");
    return (
        <Container fluid="lg" className="side-shadow overflow-y-visible">
            <Row>
                <h1>Catalog</h1>
                <Filter
                    setBackorder={setBackorder}
                    setIsInStock={setIsInStock}
                    setCategory={setCategory}
                    setShowNoItemsFound={setShowNoItemsFound}
                    category={category}
                    isInStock={isInStock}
                    backorder={backorder}
                    setMaxPriceFilter={setMaxPriceFilter}
                    setMinPriceFilter={setMinPriceFilter}
                />
                <SearchBar
                    currentSearch={currentSearch}
                    setCurrentSearch={setCurrentSearch}
                    setShowNoItemsFound={setShowNoItemsFound}
                />
                <p></p>
                <hr></hr>
            </Row>
            <Row className="overflow-y-visible pb-3">
                <ProductDisplayGrid
                    category={category}
                    isInStock={isInStock}
                    backorder={backorder}
                    currentSearch={currentSearch}
                    showNoItemsFound={showNoItemsFound}
                    setShowNoItemsFound={setShowNoItemsFound}
                    minprice={minprice}
                    maxprice={maxprice}
                />
            </Row>
        </Container>
    );
};
