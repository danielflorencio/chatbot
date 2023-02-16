import { OptionsMessage } from "./optionMessage";
import { TextMessage } from "./textMessage";

export type Message = {
    messageType: TextMessage | OptionsMessage;
    content: string;
    sender: string;
    recipient: string;
    date: Date;
}