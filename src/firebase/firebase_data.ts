/**
 * Firebase Firestore Adapter
 * merematt@udel.edu
 * 4/8/2023
 */

import {
    getFirestore,
    Firestore,
    UpdateData,
    CollectionReference,
    DocumentReference,
    collection,
    doc,
    getDoc,
    getDocs,
    setDoc,
    updateDoc,
    deleteDoc,
    query,
    where,
    QueryConstraint
} from "firebase/firestore";
import { app } from "./firebase";
import { Product } from "../interface/product";
import { UserAccount, UserAccountPrivilege } from "../interface/account";
import { Cart } from "../interface/cart";
import { User } from "firebase/auth";
import { Order } from "../interface/order";
import { useEffect, useState } from "react";
import { fetchUserAccountPrivilegeOrDefault } from "./firebase_auth";

export interface ReferencedObject<T> {
    data: T;
    reference: DocumentReference<T>;
}

let db: Firestore;

export function data_Initialize() {
    db = getFirestore(app);
}

/**
 * Firestore doesn't know the datatype, but we do
 * Only use this function if you know what you're doing
 * @param reference The reference to coerce
 * @returns The coerced reference
 */
function coerce<T>(reference: CollectionReference): CollectionReference<T> {
    return reference as CollectionReference<T>;
}

/**
 * Firestore doesn't know the datatype, but we do
 * Only use this function if you know what you're doing
 * @param reference The reference to coerce
 * @returns The coerced reference
 */
function coerceDoc<T>(reference: DocumentReference): DocumentReference<T> {
    return reference as DocumentReference<T>;
}

/**
 * Unpack data from a promise into a state variable.
 *
 * Data should only be loaded on first page load and when changed,
 * therefore avoid calling this function outside of a `useEffect`
 * @param promise The promise that will be unpacked
 * @param stateDispatcher The state dispatcher that accepts the data
 * @param errorStateDispatcher A boolean state dispatcher for if the Promise rejects
 * @deprecated Use the objects corresponding hook instead of calling this function
 */
export function data_HookPromiseState<T>(
    promise: Promise<T>,
    stateDispatcher: React.Dispatch<React.SetStateAction<T>>,
    errorStateDispatcher: React.Dispatch<React.SetStateAction<boolean>>
) {
    promise
        .then((object) => stateDispatcher(object))
        .catch(() => errorStateDispatcher(true));
}

/**
 * Wraps unpacking a Promise into a state variable. This is probably not what you're looking for.
 * You should probably be using the state hook that corresponds to the data you're trying to access
 * @param databaseFunction A function that will execute the database call
 * @param defaultValue The value to use while waiting on the database
 * @param stateDependencies A list of state variables that should cause the database to refresh
 * @param onSuccess An optional function that will be called on successful loading
 * @param onError An optional functio that will be called on loading failure
 * @returns A state variable that will contains the data when the Promise resolves
 */
export function useDatabase<T>(
    databaseFunction: () => Promise<T>,
    defaultValue: T,
    stateDependencies?: React.DependencyList,
    onSuccess?: () => void,
    onError?: (reason: string) => void
): T {
    const [result, setResult] = useState<T>(defaultValue);
    useEffect(() => {
        databaseFunction()
            .then((object) => {
                setResult(object);
                if (onSuccess) onSuccess();
            })
            .catch((reason) => {
                if (onError) {
                    // Firebase puts the actual reason in .message
                    if (reason.message) {
                        onError(reason.message);
                    } else {
                        onError(reason);
                    }
                }
            });
    }, stateDependencies);
    return result;
}

/**
 * List documents in a collection
 * @param collectionReference The collection to list
 * @returns A Promise that resolves with the documents, or rejects if an error occurs
 */
function db_List<T>(
    collectionReference: CollectionReference<T>
): Promise<ReferencedObject<T>[]> {
    return new Promise((resolve, reject) =>
        getDocs(collectionReference)
            .then((querySnapshot) =>
                resolve(
                    querySnapshot.docs.map((documentSnapshot) => ({
                        data: documentSnapshot.data(),
                        reference: documentSnapshot.ref
                    }))
                )
            )
            .catch(reject)
    );
}

/**
 * Get a specific document from the database
 * @param documentReference The document to retrieve
 * @returns A Promise that resolves to a reference to the document, or rejects if an error occurs or the document does not exist
 */
function db_Get<T>(
    documentReference: DocumentReference<T>
): Promise<ReferencedObject<T>> {
    return new Promise((resolve, reject) => {
        getDoc(documentReference)
            .then((documentSnapshot) => {
                if (documentSnapshot.exists()) {
                    resolve({
                        data: documentSnapshot.data(),
                        reference: documentSnapshot.ref
                    });
                } else {
                    reject("Not found");
                }
            })
            .catch(reject);
    });
}

/**
 * Get all document from the database matching the constraints
 * @param collectionReference The document to retrieve
 * @param constraints The constraints to check against
 * @returns A Promise that resolves to a (potentially empty) list of documents, or rejects if an error occurs
 */
function db_Query<T>(
    collectionReference: CollectionReference<T>,
    ...constraints: QueryConstraint[]
): Promise<ReferencedObject<T>[]> {
    return new Promise((resolve, reject) => {
        getDocs(query(collectionReference, ...constraints))
            .then((querySnapshot) => {
                resolve(
                    querySnapshot.docs.map((documentSnapshot) => ({
                        data: documentSnapshot.data(),
                        reference: documentSnapshot.ref
                    }))
                );
            })
            .catch(reject);
    });
}

/**
 * Create a document in a collection
 * @param collectionReference The collection to create the document
 * @param object The object that contains the document fields
 * @returns A Promise that resolves to a reference to the new document, or rejects if an error occurs
 */
function db_Create<T>(
    collectionReference: CollectionReference<T>,
    object: T,
    documentId?: string
): Promise<ReferencedObject<T>> {
    return new Promise((resolve, reject) => {
        const reference = documentId
            ? doc(collectionReference, documentId)
            : doc(collectionReference);

        setDoc(reference, object)
            .then(() =>
                resolve({
                    data: object,
                    reference: reference
                })
            )
            .catch(reject);
    });
}

/**
 * Update a document
 * @param objectReference The object reference to update
 * @returns A Promise that resolves to the updated document, or rejects if an error occurs
 */
function db_Update<T>(
    objectReference: ReferencedObject<T>
): Promise<ReferencedObject<T>> {
    return new Promise((resolve, reject) =>
        updateDoc(
            objectReference.reference,
            objectReference.data as UpdateData<T>
        )
            .then(() => resolve(objectReference))
            .catch(reject)
    );
}

/**
 * Stored in /items/{itemID}
 */
export class ProductData {
    static collection = "items";

    static list(): Promise<ReferencedObject<Product>[]> {
        return db_List(coerce<Product>(collection(db, this.collection)));
    }

    static get(
        product: DocumentReference<Product>
    ): Promise<ReferencedObject<Product>> {
        return db_Get(product);
    }

    static create(product: Product): Promise<ReferencedObject<Product>> {
        return db_Create(
            coerce<Product>(collection(db, this.collection)),
            product
        );
    }

    static update(
        product: ReferencedObject<Product>
    ): Promise<ReferencedObject<Product>> {
        return db_Update(product);
    }

    static delete(product: DocumentReference<Product>): Promise<void> {
        return deleteDoc(product);
    }
}

/**
 * Stored in /users/{uid}
 */
export class AccountData {
    static collection = "users";
    static privilege = "privilege";
    static account = "account";

    static getAccountReference(user: User): DocumentReference<UserAccount> {
        return coerceDoc<UserAccount>(
            doc(db, this.collection, user.uid, this.account, this.account)
        );
    }

    static getAccountPrivilegeReference(
        user: User
    ): DocumentReference<UserAccountPrivilege> {
        return coerceDoc<UserAccountPrivilege>(
            doc(db, this.collection, user.uid, this.privilege, this.privilege)
        );
    }

    static list(): Promise<ReferencedObject<UserAccount>[]> {
        return db_List(coerce<UserAccount>(collection(db, this.collection)));
    }

    static get(
        account: DocumentReference<UserAccount>
    ): Promise<ReferencedObject<UserAccount>> {
        return db_Get(account);
    }

    static getPrivilege(privilege: DocumentReference<UserAccountPrivilege>) {
        return db_Get(privilege);
    }

    static create(
        user: User,
        account: UserAccount
    ): Promise<ReferencedObject<UserAccount>> {
        return db_Create(
            coerce<UserAccount>(
                collection(db, this.collection, user.uid, this.account)
            ),
            account,
            this.account
        );
    }

    static createPrivilege(
        user: User,
        privilege: UserAccountPrivilege
    ): Promise<ReferencedObject<UserAccountPrivilege>> {
        return db_Create(
            coerce<UserAccountPrivilege>(
                collection(db, this.collection, user.uid, this.privilege)
            ),
            privilege,
            this.privilege
        );
    }

    static update(
        account: ReferencedObject<UserAccount>
    ): Promise<ReferencedObject<UserAccount>> {
        return db_Update(account);
    }

    static updatePrivilege(
        privilege: ReferencedObject<UserAccountPrivilege>
    ): Promise<ReferencedObject<UserAccountPrivilege>> {
        return db_Update(privilege);
    }
}

/**
 * Stored in /carts/{uid}/items/items
 */
export class CartData {
    static collection = "carts";
    static document = "items";

    static getCartCollection(account: User): CollectionReference<Cart> {
        return coerce<Cart>(
            collection(db, this.collection, account.uid, this.document)
        );
    }

    static getCartDoc(account: User): DocumentReference<Cart> {
        return doc(this.getCartCollection(account), this.document);
    }

    static get(account: User): Promise<ReferencedObject<Cart>> {
        return db_Get(this.getCartDoc(account));
    }

    static create(account: User): Promise<ReferencedObject<Cart>> {
        return db_Create(
            this.getCartCollection(account),
            { items: [] },
            this.document
        );
    }

    static getOrCreate(account: User): Promise<ReferencedObject<Cart>> {
        return new Promise((resolve, reject) => {
            this.get(account)
                .then(resolve)
                .catch((err) => {
                    if (err === "Not found") {
                        this.create(account).then(resolve).catch(reject);
                    } else {
                        reject(err);
                    }
                });
        });
    }

    static update(account: User, cart: Cart): Promise<ReferencedObject<Cart>> {
        return db_Update({ reference: this.getCartDoc(account), data: cart });
    }
}

/**
 * Stored in /orders/{orderId}
 */
export class OrderData {
    static collection = "orders";

    /**
     * @returns The orders for a user, or an empty array if no user
     */
    static list(user: User | null): Promise<ReferencedObject<Order>[]> {
        return user
            ? db_Query(
                  coerce<Order>(collection(db, this.collection)),
                  where("user", "==", user.uid)
              )
            : Promise.resolve([]);
    }

    static listAll(
        currentUser: User | null
    ): Promise<ReferencedObject<Order>[]> {
        return new Promise((resolve, reject) => {
            if (currentUser) {
                fetchUserAccountPrivilegeOrDefault(currentUser).then(
                    (privilege) => {
                        if (privilege && privilege.admin) {
                            // todo role checking
                            resolve(
                                db_List(
                                    coerce<Order>(
                                        collection(db, this.collection)
                                    )
                                )
                            );
                        } else {
                            reject("Insufficient Privileges");
                        }
                    }
                );
            } else {
                reject("Insufficient Privileges");
            }
        });
    }

    static get(
        order: DocumentReference<Order>
    ): Promise<ReferencedObject<Order>> {
        return db_Get(order);
    }

    static create(order: Order): Promise<ReferencedObject<Order>> {
        return db_Create(coerce<Order>(collection(db, this.collection)), order);
    }

    static update(
        order: ReferencedObject<Order>
    ): Promise<ReferencedObject<Order>> {
        return db_Update(order);
    }

    static delete(order: DocumentReference<Order>): Promise<void> {
        return deleteDoc(order);
    }
}
