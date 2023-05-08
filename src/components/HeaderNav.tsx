import React from "react";
import { Badge, Button, Nav } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import { useCart } from "../interface/cart";
import { AuthComponent } from "./AuthComponent";

import { useLoggedInUserAccountPrivilege } from "../firebase/firebase_auth";

export const HeaderNav = (): JSX.Element => {
    const cart = useCart();

    const priv = useLoggedInUserAccountPrivilege();
    const admin = (priv && priv.admin) || false;

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
            <a className="navbar-brand" href="#/">
                <img
                    src={process.env.PUBLIC_URL + "/brand.png"}
                    height="30"
                    alt=""
                ></img>
            </a>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                {admin ? <AdminLinks /> : <UserLinks />}
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

//Link Bundles by Role
const UserLinks = (): JSX.Element => {
    return (
        <Nav className="me-auto">
            <LinkProducts />
        </Nav>
    );
};

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
