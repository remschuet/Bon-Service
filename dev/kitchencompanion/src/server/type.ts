export type User = {
    email: string;
    password: string;
    isVerified?: boolean;
    firstName?: string;
    name?: string;
    phoneNumber?: string;
    address?: string;
    avatar_key?: string;
}