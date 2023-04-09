import {
    Auth,
    User,
    getAuth,
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut
} from "firebase/auth";
import { app } from "./firebase";

let auth: Auth;
let currentUser: User | null;

export function auth_Initialize() {
    auth = getAuth(app);

    onAuthStateChanged(auth, (user) => {
        currentUser = user;
        console.log("current user", user?.email);
    });
}

export function auth_HookUserState(
    stateDispatcher: React.Dispatch<React.SetStateAction<User | null>>
) {
    onAuthStateChanged(auth, (user) => {
        stateDispatcher(user);
    });
}

export function auth_GetCurrentUser(): User | null {
    return currentUser;
}

export function auth_CreateUser(
    email: string,
    password: string
): Promise<User> {
    return new Promise((resolve, reject) => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                resolve(userCredential.user);
            })
            .catch((error) => {
                reject(error.message);
            });
    });
}

export function auth_SignIn(email: string, password: string): Promise<User> {
    return new Promise((resolve, reject) => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                resolve(userCredential.user);
            })
            .catch((error) => {
                reject(error.message);
            });
    });
}

export function auth_SignOut() {
    signOut(auth);
}
