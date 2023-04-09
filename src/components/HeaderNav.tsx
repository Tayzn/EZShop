import React from "react";
import { Badge, Button, Nav, NavDropdown } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import { AuthComponent } from "./AuthComponent";

interface HeaderNavProps {
    setCartView: React.Dispatch<React.SetStateAction<boolean>>;
}

export const HeaderNav = ({ setCartView }: HeaderNavProps): JSX.Element => {
    return (
        <Navbar
            collapseOnSelect
            expand="sm"
            style={{
                backgroundColor: "#a1f79f",
                paddingLeft: "16px",
                paddingRight: "16px"
            }}
        >
            <Navbar.Brand href="/">EZShop™</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <AdminLinks />
                <Navbar.Collapse className="justify-content-end">
                    <AuthComponent />
                    <div style={{ marginLeft: "20px" }}></div>
                    <Button variant="outline-dark" href="#">
                        Cart
                        <Badge pill style={{ marginLeft: "10px" }} bg="dark">
                            2
                        </Badge>
                    </Button>
                </Navbar.Collapse>
            </Navbar.Collapse>
        </Navbar>
    );
};

// Links
const LinkProducts = (): JSX.Element => (
    <Nav.Link href="#home">Products</Nav.Link>
);

const LinkOrders = (): JSX.Element => (
    <NavDropdown.Item href="#action/3.1">View Orders</NavDropdown.Item>
);

const LinkInventory = (): JSX.Element => (
    <NavDropdown.Item href="#action/3.1">Manage Inventory</NavDropdown.Item>
);

const LinkUsers = (): JSX.Element => (
    <NavDropdown.Item href="#action/3.1">Manage Users</NavDropdown.Item>
);

// Link Bundles by Role
const UserLinks = (): JSX.Element => {
    return (
        <Nav className="me-auto">
            <LinkProducts />
        </Nav>
    );
};

const StockerLinks = (): JSX.Element => {
    return (
        <Nav className="me-auto">
            <LinkProducts />
            <NavDropdown title="Stocker" id="collasible-nav-dropdown">
                <LinkOrders />
            </NavDropdown>
        </Nav>
    );
};

const SupplierLinks = (): JSX.Element => {
    return (
        <Nav className="me-auto">
            <LinkProducts />
            <NavDropdown title="Supplier" id="collasible-nav-dropdown">
                <LinkInventory />
            </NavDropdown>
        </Nav>
    );
};

const AdminLinks = (): JSX.Element => {
    return (
        <Nav className="me-auto">
            <LinkProducts />
            <NavDropdown title="Admin" id="collasible-nav-dropdown">
                <LinkInventory />
                <LinkOrders />
                <NavDropdown.Divider />
                <LinkUsers />
            </NavDropdown>
        </Nav>
    );
};
