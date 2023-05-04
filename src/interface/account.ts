/**
 * User Account
 * merematt@udel.edu
 * 4/8/2023
 */

export type UserRole = "stocker" | "supplier";
export type UserId = string;

export interface UserAccountPrivilege {
    admin: boolean;
    role: UserRole[];
}

export interface UserAccount {
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
