import {
    Auth,
    User,
    Unsubscribe,
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
    });
}

/**
 * Hook a state dispatcher onto login change events
 * @param stateDispatcher The state dispatcher to attach
 * @returns An unsubscribe function to clean up when done
 */
export function auth_HookUserState(
    stateDispatcher: React.Dispatch<React.SetStateAction<User | null>>
): Unsubscribe {
    return onAuthStateChanged(auth, (user) => {
        stateDispatcher(user);
    });
}

/**
 * Get the current logged in user
 * @returns The user or null if not logged in
 */
export function auth_GetCurrentUser(): User | null {
    return currentUser;
}

/**
 * Create a user
 * @param email The users email
 * @param password The users password
 * @returns A Promise that resolves with the new logged in user, or rejects if an error occurred
 */
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

/**
 * Sign in a user
 * @param email The users email
 * @param password The users password
 * @returns A Promise that resolves with the new logged in user, or rejects if an error occurred
 */
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

/**
 * Sign out the current logged in user (if any)
 */
export function auth_SignOut() {
    signOut(auth);
}
