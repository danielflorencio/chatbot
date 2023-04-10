import { Conversation } from "../types/Conversation"
export const Conversations: Conversation[] = [
    {
        messages: [
            {
            content: 'Hey, message number one here.',
            senderReference: '+55084998345849',
            recipientReference: 'test@gmail.com',
            senderType: 'customer',
            date: new Date().toISOString()
            },
            {
            content: 'And more',
            senderReference: '+55084998345849',
            recipientReference: 'test@gmail.com',
            senderType: 'customer',
            date: new Date().toISOString()
            },
            {
            content: 'more',
            senderReference: '+55084998345849',
            recipientReference: 'test@gmail.com',
            senderType: 'customer',
            date: new Date().toISOString()
            },
        ],
        adminId: 'test@gmail.com',
        customerId: '+55084998345849',
    },
    {
        messages: [
            {
            content: 'Message number two',
            senderReference: '+55084994745975',
            recipientReference: 'test@gmail.com',
            senderType: 'customer',
            date: new Date().toISOString()
            },
            {
            content: 'Another',
            senderReference: '+55084994745975',
            recipientReference: 'test@gmail.com',
            senderType: 'customer',
            date: new Date().toISOString()
            },
            {
            content: 'Hey',
            senderReference: '+55084994745975',
            recipientReference: 'test@gmail.com',
            senderType: 'customer',
            date: new Date().toISOString()
            },
        ],
        adminId: 'test@gmail.com',
        customerId: '+55084994745975'
    },
    {
        messages: [
            {
            content: 'And then three.',
            senderReference: '+55084998913847',
            recipientReference: 'test@gmail.com',
            senderType: 'customer',
            date: new Date().toISOString()
            },
            {
            content: 'One more message.',
            senderReference: '+55084998913847',
            recipientReference: 'test@gmail.com',
            senderType: 'customer',
            date: new Date().toISOString()
            },
            {
            content: 'Hey',
            senderReference: '+55084998913847',
            recipientReference: 'test@gmail.com',
            senderType: 'customer',
            date: new Date().toISOString()
            },
        ],
        adminId: 'test@gmail.com',
        customerId: '+55084998913847',
    }
]