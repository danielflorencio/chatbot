import { OptionsMessage } from "./optionMessage";
import { TextMessage } from "./textMessage";

export type Message = {
    messageType?: TextMessage | OptionsMessage;
    content: string;
    senderReference: string;
    recipientReference: string;
    senderType: 'admin' | 'customer';
    date: Date;
}