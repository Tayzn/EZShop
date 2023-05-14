/**
 * User Account
 * merematt@udel.edu
 * 4/8/2023
 */

import { Timestamp } from "firebase/firestore";
import {
    AccountData,
    ReferencedObject,
    useDatabase
} from "../firebase/firebase_data";
import { User } from "firebase/auth";

export type UserRole = "stocker" | "supplier";
export type UserId = string;

export interface UserAccountPrivilege {
    admin: boolean;
    role: UserRole[];
}

export interface UserAccount {
    name: string;
    email: string;
    addresses: UserAddress[];
    payments: UserPayment[];
}

export interface UserAddress {
    addr1: string;
    addr2: string | null;
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

export function getDefaultAddress(): UserAddress {
    return {
        addr1: "",
        addr2: "",
        city: "",
        state: "",
        zip: ""
    };
}

export function getDefaultPayment(): UserPayment {
    return {
        cardholderName: "",
        cardNumber: "",
        expiration: new Date(),
        cvv: "",
        zip: ""
    };
}

export function firstAddress(account: UserAccount | null): UserAddress {
    return !account || account.addresses.length === 0
        ? getDefaultAddress()
        : account.addresses[0];
}

export function firstPayment(account: UserAccount | null): UserPayment {
    const payment =
        !account || account.payments.length === 0
            ? getDefaultPayment()
            : account.payments[0];

    if (payment.expiration instanceof Timestamp) {
        payment.expiration = payment.expiration.toDate();
    }

    return payment;
}

export function isAdmin(
    account: ReferencedObject<UserAccount>
): Promise<ReferencedObject<UserAccountPrivilege>> {
    return new Promise((resolve, reject) => {
        const privRef = AccountData.getAccountPrivilegeReferenceId(
            account.reference.id
        );

        AccountData.getPrivilege(privRef).then(resolve).catch(reject);
    });
}

export function useAccounts(
    stateDependencies?: React.DependencyList,
    onSuccess?: () => void,
    onError?: (reason: string) => void
): ReferencedObject<UserAccount>[] {
    return useDatabase(
        () => AccountData.list(),
        [],
        stateDependencies,
        onSuccess,
        onError
    );
}

export function saveAccount(
    user: User,
    address: UserAddress,
    payment: UserPayment,
    saveShipping: boolean,
    savePayment: boolean
): Promise<void> {
    return new Promise((resolve, reject) => {
        AccountData.get(AccountData.getAccountReference(user))
            .then((account) => {
                const newAddress: UserAddress = { ...address };
                const newPayment: UserPayment = { ...payment };

                if (saveShipping && !savePayment) {
                    account.data = {
                        ...account.data,
                        addresses: [newAddress]
                    };
                } else if (!saveShipping && savePayment) {
                    account.data = {
                        ...account.data,
                        payments: [newPayment]
                    };
                } else {
                    account.data = {
                        ...account.data,
                        addresses: [newAddress],
                        payments: [newPayment]
                    };
                }

                AccountData.update(account)
                    .then(() => resolve())
                    .catch(reject);
            })
            .catch(reject);
    });
}
