import { Conversation } from "../types/conversation";
export const Conversations: Conversation[] = [
    {
        messages: [
            {
            content: 'Hey, message number one here.',
            senderReference: '',
            recipientReference: '',
            senderType: 'customer',
            date: new Date().toISOString()
            },
            {
            content: '',
            senderReference: '',
            recipientReference: '',
            senderType: 'customer',
            date: new Date().toISOString()
            },
            {
            content: '',
            senderReference: '',
            recipientReference: '',
            senderType: 'customer',
            date: new Date().toISOString()
            },
        ],
        adminId: 'test@gmail.com',
        customerId: '+55084998345849',
        conversationId: '1'
    },
    {
        messages: [
            {
            content: 'Message number two',
            senderReference: '',
            recipientReference: '',
            senderType: 'customer',
            date: new Date().toISOString()
            },
            {
            content: '',
            senderReference: '',
            recipientReference: '',
            senderType: 'customer',
            date: new Date().toISOString()
            },
            {
            content: '',
            senderReference: '',
            recipientReference: '',
            senderType: 'customer',
            date: new Date().toISOString()
            },
        ],
        adminId: 'test@gmail.com',
        customerId: '+55084994745975',
        conversationId: '2'
    },
    {
        messages: [
            {
            content: 'And then three.',
            senderReference: '',
            recipientReference: '',
            senderType: 'customer',
            date: new Date().toISOString()
            },
            {
            content: '',
            senderReference: '',
            recipientReference: '',
            senderType: 'customer',
            date: new Date().toISOString()
            },
            {
            content: '',
            senderReference: '',
            recipientReference: '',
            senderType: 'customer',
            date: new Date().toISOString()
            },
        ],
        adminId: 'test@gmail.com',
        customerId: '+55084998913847',
        conversationId: '3'
    }
]