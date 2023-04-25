import React, { useState, useEffect } from "react";
import { Badge, Button, Nav } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import { AuthComponent } from "./AuthComponent";
import { Cart, getCart, cart_HookCartState } from "../interface/cart";

export const HeaderNav = (): JSX.Element => {
    const [cart, setCart] = useState<Cart>(getCart());
    useEffect(() => cart_HookCartState(setCart), []);

    return (
        <Navbar
            collapseOnSelect
            expand="sm"
            style={{
                backgroundColor: "#90ee90",
                paddingLeft: "16px",
                paddingRight: "16px",
                boxShadow: "0 4px 6px -6px #222"
            }}
        >
            <Navbar.Brand href="#/">EZShop™</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <AdminLinks />
                <Navbar.Collapse className="justify-content-end">
                    <AuthComponent />
                    <div style={{ marginLeft: "20px" }}></div>
                    <Button variant="outline-dark" href="#/cart">
                        Cart
                        <Badge pill style={{ marginLeft: "10px" }} bg="dark">
                            {cart.items.length}
                        </Badge>
                    </Button>
                </Navbar.Collapse>
            </Navbar.Collapse>
        </Navbar>
    );
};

// Links
const LinkProducts = (): JSX.Element => <Nav.Link href="#/">Products</Nav.Link>;

const LinkAdmin = (): JSX.Element => <Nav.Link href="#/admin">Admin</Nav.Link>;

/*
const LinkOrders = (): JSX.Element => (
    <NavDropdown.Item href="#/admin">View Orders</NavDropdown.Item>
);

const LinkInventory = (): JSX.Element => (
    <NavDropdown.Item href="#/admin">Manage Inventory</NavDropdown.Item>
);

const LinkUsers = (): JSX.Element => (
    <NavDropdown.Item href="#/admin">Manage Users</NavDropdown.Item>
);
*/

// Link Bundles by Role
// const UserLinks = (): JSX.Element => {
//     return (
//         <Nav className="me-auto">
//             <LinkProducts />
//         </Nav>
//     );
// };

// const StockerLinks = (): JSX.Element => {
//     return (
//         <Nav className="me-auto">
//             <LinkProducts />
//             <NavDropdown title="Stocker" id="collasible-nav-dropdown">
//                 <LinkOrders />
//             </NavDropdown>
//         </Nav>
//     );
// };

// const SupplierLinks = (): JSX.Element => {
//     return (
//         <Nav className="me-auto">
//             <LinkProducts />
//             <NavDropdown title="Supplier" id="collasible-nav-dropdown">
//                 <LinkInventory />
//             </NavDropdown>
//         </Nav>
//     );
// };

const AdminLinks = (): JSX.Element => {
    return (
        <Nav className="me-auto">
            <LinkProducts />
            <LinkAdmin />
        </Nav>
    );
};
