export type Step = {
    referenceLastStepId?: string,
    LastUserReceivedMessages: string[],
    options: Option[],
}

export type Option = {
    optionCTA: string, 
    referenceNextStepId: string
}

/* 
Each step shall have different options to choose from.
Each option should contain a reference (link) to the next step.
Each step should understand the last messages sent by the user.
*/