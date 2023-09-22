import { Message } from "./message"

export type Step = {
    id: string, 
    conditionType: string, 
    lastStepId?: string,
    options?: Option[],
    messages: Message[], 
    NodeXPosition: number, 
    NodeYPosition: number,
}

export type Option = {
    optionCTA: string, 
    referenceNextStepId?: string
}

/* 
    Each step shall have different options to choose from.
    Each option should contain a reference (link) to the next step.
    Each step should understand the last messages sent by the user.
    It can work by by putting the message's content in the Option type message CTA.
*/