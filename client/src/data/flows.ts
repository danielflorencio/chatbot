import { Flow } from "../types/Flow";

export const FlowsData: Flow[] = [
    {
        steps: [
            {
                id: '1',
                messages: [
                    {
                        content: 'Hey, what do you wanna do right now?',
                        senderType: 'admin', 
                        date: '2023-09-16',
                        customerReference: '',
                        adminReference: ''
                    }
                ],
                options: [
                    {
                        optionCTA: 'Call me.',
                        referenceNextStepId: '2'
                    },
                    {
                        optionCTA: 'Stop conversaton.'
                    }
                ],
                NodeXPosition: 100, 
                NodeYPosition: 50
            },
            {
                id: '2',
                messages: [
                    {
                        content: "Ok, I'm calling you now!", 
                        senderType: 'admin',
                        adminReference: '',
                        customerReference: '',
                        date: '2023-09-16',
                    }
                ],
                NodeXPosition: 400,
                NodeYPosition: 50
            },
        ]
    }

]