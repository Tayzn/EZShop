import React from "react";
import { Form } from "react-bootstrap";
type searchProps = {
    currentSearch: string;
    setCurrentSearch: (setSearchInput: string) => void;
    setShowNoItemsFound: (displayNoItemsFound: boolean) => void;
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
    function searchEvent(event: React.ChangeEvent<HTMLInputElement>) {
        props.setShowNoItemsFound(false);
        props.setCurrentSearch(event.target.value);
    }
    return (
        <div className="wrap">
            <div className="search">
                <Form.Group controlId="editName">
                    <Form.Control
                        className="searchBar"
                        value={props.currentSearch}
                        placeholder="search"
                        onChange={searchEvent}
                    />
                </Form.Group>
            </div>
        </div>
    );
}
