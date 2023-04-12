import React from "react";
import { Button, Form } from "react-bootstrap";
type searchProps = {
    setSearchInput: (setSearchInput: string) => void;
    searchInput: string;
    setCurrentSearch: (setSearchInput: string) => void;
};
//import { ProductData } from "./../firebase/firebase_data";
export function SearchBar(props: searchProps): JSX.Element {
    //search by category or item name. hit enter or search button to load results
    //still need to add search suggest
    //
    //
    //const onSearch = (input: props.searchInput) => {
    //now get product names/cats and if they match, put dem in
    //if (ProductData.data.name === input) {
    //console.log("match");
    //}
    //};
    return (
        <div className="wrap">
            <div className="search">
                <Form.Group controlId="editName">
                    <Form.Control
                        className="searchBar"
                        value={props.searchInput}
                        placeholder="search"
                        onKeyDown={(
                            e: React.KeyboardEvent<HTMLInputElement>
                        ) => {
                            if (e.key === "Enter") {
                                props.setCurrentSearch(props.searchInput);
                            }
                        }}
                        onChange={(
                            event: React.ChangeEvent<HTMLInputElement>
                        ) => props.setSearchInput(event.target.value)}
                    />
                </Form.Group>
                <Button
                    onClick={() => props.setCurrentSearch(props.searchInput)}
                    className="searchButton"
                >
                    🔍
                </Button>
            </div>
            <div></div>
        </div>
    );
}
