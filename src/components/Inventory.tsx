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
}
export const Inventory = (): JSX.Element => {
    const [category, setCategory] = useState("any");
    const [isInStock, setIsInStock] = useState(true);
    const [backorder, setBackorder] = useState(false);
    const [searchInput, setSearchInput] = useState("");
    const [currentSearch, setCurrentSearch] = useState("");
    return (
        <Container fluid="lg" className="side-shadow overflow-y-visible">
            <Row>
                <h1>Catalog</h1>
                <Filter
                    setBackorder={setBackorder}
                    setIsInStock={setIsInStock}
                    setCategory={setCategory}
                    category={category}
                    isInStock={isInStock}
                    backorder={backorder}
                />
                <SearchBar
                    setSearchInput={setSearchInput}
                    searchInput={searchInput}
                    setCurrentSearch={setCurrentSearch}
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
                />
            </Row>
        </Container>
    );
};
