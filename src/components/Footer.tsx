import React, { useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import ContactForm from "./ContactForm";

export const Footer = (): JSX.Element => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <Navbar
            style={{
                backgroundColor: "#e6e6e6",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}
        >
            <div style={{ paddingLeft: "10px" }}>EZShop™</div>

            <Button
                variant="primary"
                onClick={handleShow}
                style={{ marginLeft: "25px" }}
            >
                Contact Us
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title
                        style={{
                            width: "100%",
                            textAlign: "center",
                            paddingLeft: "40px"
                        }}
                    >
                        Contact Us
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ContactForm />
                </Modal.Body>
            </Modal>

            <Navbar.Collapse className="justify-content-end">
                <a
                    href="https://github.com/Tayzn/EZShop/"
                    style={{ paddingRight: "10px" }}
                >
                    Source Code
                </a>
            </Navbar.Collapse>
        </Navbar>
    );
};
