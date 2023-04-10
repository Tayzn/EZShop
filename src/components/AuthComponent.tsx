/**
 * Navbar authentication component
 * merematt@udel.edu
 * 4/8/2023
 */

import React, { useEffect, useState } from "react";
import {
    auth_CreateUser,
    auth_GetCurrentUser,
    auth_GoogleSignIn,
    auth_HookUserState,
    auth_SignIn,
    auth_SignOut
} from "../firebase/firebase_auth";
import { User } from "firebase/auth";
import { Alert, Button, FloatingLabel, Form, Modal } from "react-bootstrap";

export function AuthComponent(): JSX.Element {
    const [user, setUser] = useState<User | null>(auth_GetCurrentUser());

    useEffect(() => {
        return auth_HookUserState(setUser);
    }, []);

    const [error, setError] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [showForm, setShowForm] = useState<boolean>(false);
    const [signUp, setSignUp] = useState<boolean>(false);

    const closeModal = () => {
        setShowForm(false);
        setSignUp(false);
        setError("");
    };

    const completeFlow = () => {
        const executor = signUp ? auth_CreateUser : auth_SignIn;
        executor(email, password)
            .then(() => {
                setEmail("");
                setPassword("");
                closeModal();
            })
            .catch(setError);
    };

    const googleFlow = () => {
        auth_GoogleSignIn()
            .then(() => {
                closeModal();
            })
            .catch(setError);
    };

    return (
        <div>
            {user ? (
                <span>
                    <p className="m-0">
                        Welcome,&nbsp;
                        {user.displayName ? user.displayName : user.email}
                        &nbsp;
                        <Button variant="secondary" onClick={auth_SignOut}>
                            Sign Out
                        </Button>
                    </p>
                </span>
            ) : (
                <span>
                    <Button variant="success" onClick={() => setShowForm(true)}>
                        Sign In
                    </Button>
                    <span> or </span>
                    <Button variant="secondary" onClick={() => setSignUp(true)}>
                        Create an Account
                    </Button>
                </span>
            )}
            <Modal show={showForm || signUp} onHide={closeModal}>
                <Modal.Header>
                    <Modal.Title>
                        {signUp ? "Create Account" : "Sign In"}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {error !== "" ? (
                        <Alert variant="danger">{error}</Alert>
                    ) : (
                        <></>
                    )}
                    <FloatingLabel label="Email">
                        <Form.Control
                            type="email"
                            value={email}
                            onChange={({ target }) => setEmail(target.value)}
                        ></Form.Control>
                    </FloatingLabel>
                    <br />
                    <FloatingLabel label="Password">
                        <Form.Control
                            type="password"
                            value={password}
                            onChange={({ target }) => setPassword(target.value)}
                        ></Form.Control>
                    </FloatingLabel>
                    <br />
                    <Button variant="success" onClick={completeFlow}>
                        {signUp ? "Create Account" : "Sign In"}
                    </Button>
                    &nbsp;
                    <Button variant="secondary" onClick={closeModal}>
                        Cancel
                    </Button>
                    &nbsp;or&nbsp;
                    <Button variant="info" onClick={googleFlow}>
                        Sign in with Google
                    </Button>
                </Modal.Body>
            </Modal>
        </div>
    );
}
