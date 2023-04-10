import { Conversation } from "./conversation";

// Switch UserData type name to AdminUser type name.
export type UserData = {
    firstName: string;
    lastName: string;
    email: string | null;
    password: string;
    conversations?: Conversation[];
}