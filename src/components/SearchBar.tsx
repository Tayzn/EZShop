import React from "react";
import { Button, Form } from "react-bootstrap";
type searchProps = {
    setSearchInput: (setSearchInput: string) => void;
    searchInput: string;
    setCurrentSearch: (setSearchInput: string) => void;
};
const handleKeyDown = (props: searchProps, event: KeyboardEvent) => {
    const { key } = event;
    console.log("pressed Enter");
    if (key === "d") {
        props.setSearchInput(props.searchInput);
    }
};
export function SearchBar(props: searchProps): JSX.Element {
    //const [searchSuggest, setSearchSuggest] = useState("search");
    return (
        <div className="wrap">
            <div className="search">
                <Form.Group controlId="editName">
                    <Form.Control
                        className="searchBar"
                        value={props.searchInput}
                        placeholder="search"
                        onKeyDown={() => handleKeyDown}
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
        </div>
    );
}
