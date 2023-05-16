import { Conversation } from "../types/conversation";
export const Conversations: Conversation[] = [
    {
        messages: [
            {
            content: 'Hey, message number one here.',
            adminReference: 'Admin user 1',
            customerReference: 'Customer user 1',
            senderType: 'customer',
            date: new Date().toISOString()
            },
            {
            content: '',
            adminReference: 'Admin user 1',
            customerReference: 'Customer user 1',
            senderType: 'customer',
            date: new Date().toISOString()
            },
            {
            content: '',
            adminReference: 'Admin user 1',
            customerReference: 'Customer user 1',
            senderType: 'customer',
            date: new Date().toISOString()
            },
        ],
        adminId: 'test@gmail.com',
        customerId: '+55084998345849'
    },
    {
        messages: [
            {
            content: 'Message number two',
            adminReference: 'Admin user 2',
            customerReference: 'Customer user 2',
            senderType: 'customer',
            date: new Date().toISOString()
            },
            {
            content: '',
            adminReference: 'Admin user 2',
            customerReference: 'Customer user 2',
            senderType: 'customer',
            date: new Date().toISOString()
            },
            {
            content: '',
            adminReference: 'Admin user 2',
            customerReference: 'Customer user 2',
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
            adminReference: 'Admin user 3',
            customerReference: 'Customer user 3',
            senderType: 'customer',
            date: new Date().toISOString()
            },
            {
            content: '',
            adminReference: 'Admin user 3',
            customerReference: 'Customer user 3',
            senderType: 'customer',
            date: new Date().toISOString()
            },
            {
            content: '',
            adminReference: 'Admin user 3',
            customerReference: 'Customer user 3',
            senderType: 'customer',
            date: new Date().toISOString()
            },
        ],
        adminId: 'test@gmail.com',
        customerId: '+55084998913847',
    }
]