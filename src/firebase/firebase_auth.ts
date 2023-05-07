import {
    Auth,
    User,
    Unsubscribe,
    getAuth,
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    GoogleAuthProvider,
    signInWithPopup
} from "firebase/auth";
import { app } from "./firebase";
import { useEffect, useState } from "react";
import { UserAccount, UserAccountPrivilege } from "../interface/account";
import { AccountData } from "./firebase_data";

let auth: Auth;
let googleProvider: GoogleAuthProvider;

let currentUser: User | null;
let currentAccount: UserAccount | null;
let currentAccountPrivilege: UserAccountPrivilege | null;

function getDefaultAccountPrivilege(): UserAccountPrivilege {
    return {
        admin: false,
        role: []
    };
}

function getDefaultAccount(): UserAccount {
    return {
        addresses: [],
        payments: []
    };
}

function fetchUserAccount(user: User | null): Promise<UserAccount | null> {
    return user
        ? new Promise((resolve, reject) => {
              AccountData.get(AccountData.getAccountReference(user))
                  .then((account) => {
                      resolve(account.data);
                  })
                  .catch((reason) => {
                      if (reason === "Not found") {
                          AccountData.create(user, getDefaultAccount())
                              .then((account) => {
                                  console.log("New user account created");
                                  resolve(account.data);
                              })
                              .catch(reject);
                      } else {
                          reject(reason);
                      }
                  });
          })
        : Promise.resolve(null);
}

function fetchUserAccountPrivilege(
    user: User | null
): Promise<UserAccountPrivilege | null> {
    return user
        ? new Promise((resolve, reject) => {
              AccountData.getPrivilege(
                  AccountData.getAccountPrivilegeReference(user)
              )
                  .then((account) => {
                      resolve(account.data);
                  })
                  .catch((reason) => {
                      if (reason === "Not found") {
                          AccountData.createPrivilege(
                              user,
                              getDefaultAccountPrivilege()
                          )
                              .then((privilige) => {
                                  console.log("New user privilege created");
                                  resolve(privilige.data);
                              })
                              .catch(reject);
                      } else {
                          reject(reason);
                      }
                  });
          })
        : Promise.resolve(null);
}

export function fetchUserAccountOrDefault(
    user: User | null
): Promise<UserAccount | null> {
    return new Promise((resolve) => {
        fetchUserAccount(user)
            .then(resolve)
            .catch((reason) => {
                console.error("Failed to load user account: ", reason);
                resolve(getDefaultAccount()); // TODO save default
            });
    });
}

export function fetchUserAccountPrivilegeOrDefault(
    user: User | null
): Promise<UserAccountPrivilege | null> {
    return new Promise((resolve) => {
        fetchUserAccountPrivilege(user)
            .then(resolve)
            .catch((reason) => {
                console.error(
                    "Failed to load user account privilege: ",
                    reason
                );
                resolve(getDefaultAccountPrivilege());
            });
    });
}

export function auth_Initialize() {
    auth = getAuth(app);
    googleProvider = new GoogleAuthProvider();
    auth.useDeviceLanguage();

    onAuthStateChanged(auth, (user) => {
        currentUser = user;
        fetchUserAccountOrDefault(currentUser).then(
            (account) => (currentAccount = account)
        );
        fetchUserAccountPrivilegeOrDefault(currentUser).then(
            (privilege) => (currentAccountPrivilege = privilege)
        );
    });
}

/**
 * Hook a state dispatcher onto login change events
 * @param stateDispatcher The state dispatcher to attach
 * @returns An unsubscribe function to clean up when done
 * @deprecated useLoggedInUser()
 */
export function auth_HookUserState(
    stateDispatcher: React.Dispatch<React.SetStateAction<User | null>>
): Unsubscribe {
    return onAuthStateChanged(auth, (user) => {
        stateDispatcher(user);
    });
}

/**
 * React Hook to get the currently logged in user
 * @returns A state variable containing the logged in user
 */
export function useLoggedInUser(): User | null {
    const [user, setUser] = useState<User | null>(currentUser);
    useEffect(() => onAuthStateChanged(auth, setUser), []);
    return user;
}

/**
 * React Hook to get the currently logged in user account
 * @returns A state variable containing the logged in user
 */
export function useLoggedInUserAccount(): UserAccount | null {
    const [userAccount, setUserAccount] = useState<UserAccount | null>(
        currentAccount
    );
    useEffect(
        () =>
            onAuthStateChanged(auth, (user) => {
                fetchUserAccountOrDefault(user).then(setUserAccount);
            }),
        []
    );
    return userAccount;
}

/**
 * React Hook to get the currently logged in user account privilege
 * @returns A state variable containing the logged in user
 */
export function useLoggedInUserAccountPrivilege(): UserAccountPrivilege | null {
    const [userAccount, setUserAccount] = useState<UserAccountPrivilege | null>(
        currentAccountPrivilege
    );
    useEffect(
        () =>
            onAuthStateChanged(auth, (user) => {
                fetchUserAccountPrivilegeOrDefault(user).then(setUserAccount);
            }),
        []
    );
    return userAccount;
}

/**
 * Hook a receiver onto login change events
 * @param receiver The function to attach
 * @returns An unsubscribe function to clean up when done
 */
export function auth_HookUser(
    receiver: (user: User | null) => void
): Unsubscribe {
    return onAuthStateChanged(auth, (user) => {
        receiver(user);
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
 * Get the current logged in users account
 * @returns The user account or null if not logged in
 */
export function auth_GetCurrentAccount(): UserAccount | null {
    return currentAccount;
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
    return new Promise((resolve, reject) =>
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                resolve(userCredential.user);
            })
            .catch((error) => {
                reject(error.message);
            })
    );
}

/**
 * Sign in with Google (opens a popup window)
 * @returns A Promise that resolves with the new logged in user, or rejects if an error occurred
 */
export function auth_GoogleSignIn(): Promise<User> {
    return new Promise((resolve, reject) =>
        signInWithPopup(auth, googleProvider)
            .then((userCredential) => resolve(userCredential.user))
            .catch((error) => {
                reject(error.message);
            })
    );
}

/**
 * Sign out the current logged in user (if any)
 */
export function auth_SignOut() {
    signOut(auth);
}
