import { Flow } from "../types/Flow";

export const FlowsData: Flow[] = [
    {
        steps: [
            {
                id: '1',
                messages: [
                    {
                        content: 'Hey, what do you wanna do now?',
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
                NodeYPosition: 300
            },
            {
                id: '2',
                lastStepId: '1',
                messages: [
                    {
                        content: "Ok, I'm calling you now!", 
                        senderType: 'admin',
                        adminReference: '',
                        customerReference: '',
                        date: '2023-09-16',
                    }
                ],
                NodeXPosition: 500,
                NodeYPosition: 350
            },
            {
                id: '3',
                lastStepId: '2',
                messages: [
                    {
                        content: "Nah, I'm good.",
                        senderType: 'admin',
                        adminReference: '',
                        customerReference: '',
                        date: '2023-09-17',
                    }
                ],
                NodeXPosition: 500, 
                NodeYPosition: 250
            },
        ]
    }

]