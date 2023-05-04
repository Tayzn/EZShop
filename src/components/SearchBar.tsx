import React from "react";
import { Form } from "react-bootstrap";
type searchProps = {
    currentSearch: string;
    setCurrentSearch: (setSearchInput: string) => void;
    setShowNoItemsFound: (displayNoItemsFound: boolean) => void;
};
export function SearchBar(props: searchProps): JSX.Element {
    function searchEvent(event: React.ChangeEvent<HTMLInputElement>) {
        props.setShowNoItemsFound(false);
        props.setCurrentSearch(event.target.value);
    }
    return (
        <div className="searchWrap">
            <div className="search">
                <Form.Group controlId="editName">
                    <Form.Control
                        className="searchBar"
                        value={props.currentSearch}
                        placeholder="Search"
                        onChange={searchEvent}
                    />
                </Form.Group>
            </div>
        </div>
    );
}
