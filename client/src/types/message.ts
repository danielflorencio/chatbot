import { OptionsMessage } from "./optionMessage";
import { TextMessage } from "./textMessage";

export type Message = {
    messageType?: TextMessage | OptionsMessage;
    content: string;
    adminReference: string | undefined | null; // string - change senderReference in currentChat message object if code breaks.
    customerReference: string;
    senderType: 'admin' | 'customer';
    date: string;
}