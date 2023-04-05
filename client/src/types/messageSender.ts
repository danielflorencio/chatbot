export type MessageSender = {
    senderType: 'admin' | 'customer',
    senderReference: string,
    recipientId: string;
}