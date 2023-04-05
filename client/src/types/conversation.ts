import { Message } from "./message";
export type Conversation = {
    messages: Message[],
    adminId: string,
    customerId: string,
    conversationId: string;
}