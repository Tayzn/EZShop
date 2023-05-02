/**
 * User Account
 * merematt@udel.edu
 * 4/8/2023
 */

import { User } from "firebase/auth";
import {
    ReferencedObject,
    useDatabase,
    AccountData
} from "../firebase/firebase_data";

export type UserRole = "stocker" | "supplier";
export type UserId = string;

export interface UserAccount {
    admin: boolean;
    role: UserRole[];
    addresses: UserAddress[];
    payments: UserPayment[];
}

export interface UserAddress {
    addr1: string;
    addr2: string;
    city: string;
    state: string;
    zip: string;
}

export interface UserPayment {
    cardNumber: string;
    expiration: Date;
    zip: string;
    cvv: string;
    cardholderName: string;
}

/**
 * Get the associated account for a user
 * @param user The user to get, if null the account will just be null
 * @param onSuccess The function to run on successful load
 * @param onError  The function to run if an error occurs
 * @returns The account for the user or null if there is no user
 */
export function useAccount(
    user: User | null,
    onSuccess?: () => void,
    onError?: (reason: string) => void
): ReferencedObject<UserAccount> | null {
    if (!user) return null;
    const reference = AccountData.getAccountReference(user);

    return useDatabase(
        () => AccountData.get(reference),
        {
            data: { admin: false, role: [], addresses: [], payments: [] },
            reference: reference
        },
        [],
        onSuccess,
        onError
    );
}
