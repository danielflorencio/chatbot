export type Message = {
    content: string;
    senderReference: string | undefined | null; // string - change senderReference in currentChat message object if code breaks.
    recipientReference: string;
    senderType: 'admin' | 'customer';
    date: string;
}