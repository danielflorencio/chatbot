import { Message } from "./Message";
export type Conversation = {
    messages: Message[],
    adminId: string,
    customerId: string,
    conversationId: string;
}
