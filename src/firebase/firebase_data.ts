/**
 * Firebase Firestore Adapter
 * merematt@udel.edu
 * 4/8/2023
 */

import {
    Firestore,
    CollectionReference,
    DocumentReference,
    UpdateData,
    getFirestore,
    collection,
    addDoc,
    updateDoc,
    getDoc,
    getDocs
} from "firebase/firestore";
import { app } from "./firebase";
import { Product } from "../interface/product";
import { UserAccount } from "../interface/account";
import { Cart } from "../interface/cart";

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
 * Unpack data from a promise into a state variable.
 *
 * Data should only be loaded on first page load and when changed,
 * therefore avoid calling this function outside of a `useEffect`
 * @param promise The promise that will be unpacked
 * @param stateDispatcher The state dispatcher that accepts the data
 * @param errorStateDispatcher A boolean state dispatcher for if the Promise rejects
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
 * Create a document in a collection
 * @param collectionReference The collection to create the document
 * @param object The object that contains the document fields
 * @returns A Promise that resolves to a reference to the new document, or rejects if an error occurs
 */
function db_Create<T>(
    collectionReference: CollectionReference<T>,
    object: T
): Promise<ReferencedObject<T>> {
    return new Promise((resolve, reject) =>
        addDoc(collectionReference, object)
            .then((documentReference) =>
                resolve({
                    data: object,
                    reference: documentReference
                })
            )
            .catch(reject)
    );
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
    static list(): Promise<ReferencedObject<Product>[]> {
        return db_List(coerce<Product>(collection(db, "items")));
    }

    static get(
        product: DocumentReference<Product>
    ): Promise<ReferencedObject<Product>> {
        return db_Get(product);
    }

    static create(product: Product): Promise<ReferencedObject<Product>> {
        return db_Create(coerce<Product>(collection(db, "items")), product);
    }

    static update(
        product: ReferencedObject<Product>
    ): Promise<ReferencedObject<Product>> {
        return db_Update(product);
    }
}

/**
 * Stored in /users/{uid}
 */
export class AccountData {
    static list(): Promise<ReferencedObject<UserAccount>[]> {
        return db_List(coerce<UserAccount>(collection(db, "users")));
    }

    static get(
        account: DocumentReference<UserAccount>
    ): Promise<ReferencedObject<UserAccount>> {
        return db_Get(account);
    }

    static create(
        account: UserAccount
    ): Promise<ReferencedObject<UserAccount>> {
        return db_Create(coerce<UserAccount>(collection(db, "users")), account);
    }

    static update(
        account: ReferencedObject<UserAccount>
    ): Promise<ReferencedObject<UserAccount>> {
        return db_Update(account);
    }
}

/**
 * Stored in /carts/{uid}/{items=**}
 */
export class CartData {}
