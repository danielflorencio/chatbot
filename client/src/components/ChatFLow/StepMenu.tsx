import { Box, Button, Divider, MenuItem, Paper, Slide, TextField, Typography } from "@mui/material";
import { Option, Step } from "../../types/Step";
import { useStore } from "reactflow";
import { useEffect, useState } from "react";
import NextStepConfig from "./NextStepConfig";
import AddResponseButton from "./AddResponseButton";
import BotAnswer from "./BotAnswer";
import DeleteIcon from '@mui/icons-material/Delete';

export default function StepMenu(
    {
        open,
        selectedStep,
        addNewStep,
        addResponseToTheStep
    }:
    {
        open: boolean,
        selectedStep: Step,
        addNewStep: (lastStepId: string) => void,
        addResponseToTheStep: (newAnswer: string, nodeId: string) => void
    }
){

    // console.log('Selected Step on StepMenu: ', selectedStep.messages)

    const [newAnswersState, setNewAnswersState] = useState<string[]>(selectedStep.messages);
    const [newAnswersMode, setNewAnswersMode] = useState<'view' | 'edit'>('view');

    const [choiceInputs, setChoiceInputs] = useState<string[]>([]);

    const [options, setOptions] = useState<Option[]>([]);

    const [triggerConditionType, setTriggerConditionType] = useState<string>('includes');
    const [conditionMessage, setConditionMessage] = useState<string>('');
    // const [botAnswer, setBotAnswer] = useState<string[]>([...selectedStep.messages]);

    // useEffect(() => {

    // }, [selectedStep.messages])

    // console.log('BotAnswer array value: ', botAnswer)

    // const handleBotAnswerChange = (newBotAnswer: string, index: number) => {
        // let newBotAnswerState = botAnswer;
        // newBotAnswerState[index] = newBotAnswer;
        // setBotAnswer(newBotAnswerState);
    // }

    // useEffect(() => {
    //     if(selectedStep){
    //         if(selectedStep.options){
    //             let newChoiceInputsState: string[] = [];
    //             selectedStep.options.map((option) => newChoiceInputsState.push(option.optionCTA));
    //             setChoiceInputs(newChoiceInputsState);
    //         }
    //     } else {

    //     }
    // }, [selectedStep])

    const handleAddNewResponse = (newAnswer: string) => {
        // const newBotAnswerState = [...botAnswer, newAnswer];
        console.log('Selected Step Id on handleAddNewResponse: ', selectedStep.id)
        addResponseToTheStep(newAnswer, selectedStep.id);
        // setBotAnswer(newBotAnswerState);
    }

    // const handleBotAnswerChange = (newBotAnswer: string, index: number) => {
    // }

    return(
        <Box sx={{position: 'absolute', right: 8, height: '90vh', display: 'flex', alignItems: 'center', zIndex: 1}}>    
            <Slide in={open}>
                <Box component={Paper} elevation={3} sx={{display: 'flex', flexDirection: 'column', minHeight: 500, width: 400, borderRadius: 4}}>
                    {
                        selectedStep !== null && selectedStep !== undefined ? (
                            <Box sx={{padding: 2, display: 'flex', flexDirection: 'column'}}>
                                <Typography variant='h6' sx={{marginBottom: 2}}>Trigger condition </Typography>
                                <Box sx={{display: 'flex', gap: 1, marginBottom: 1}}>
                                <TextField label='Condition Type' select value={triggerConditionType} fullWidth size='small'>
                                    <MenuItem value='includes'>Messages include</MenuItem>
                                </TextField>
                                <TextField value={conditionMessage} onChange={(e) => setConditionMessage(e.target.value)} type='text' label='Condition messages' fullWidth size='small'/>
                                </Box>
                                <Divider/>

                                <Typography variant='h6' sx={{marginBottom: 1}}>Response</Typography>
                                <Box sx={{display: 'flex', flexDirection: 'column', gap: 1}}>
                                {   
                                    selectedStep.messages.map((message: string, index: number) => (
                                        // <TextField disabled={newAnswersMode === 'view' ? true : false} fullWidth type='text' label={`Response ${index + 1}`} size='small' value={message} />
                                        // <BotAnswer key={index} answer={message} index={index} handleBotAnswerChange={handleBotAnswerChange}/>
                                        <BotAnswer key={index} answer={message} index={index}/>
                                    ))
                                }
                                {selectedStep.messages.length <= 3 ? <AddResponseButton handleAddNewResponse={handleAddNewResponse}/> : null}
                                </Box>
                                <Divider sx={{marginTop: 1}}/>

                                <Typography variant='h6' sx={{marginBottom: 1}}>Next step condition</Typography>
                                <Box sx={{display: 'flex', flexDirection: 'column', gap: 2, paddingY: 1}}>
                                         
                                    <TextField value={'multiple-choice'} select label='Condition type' fullWidth size='small'>
                                        <MenuItem value={'multiple-choice'}>Multiple Choice</MenuItem>
                                    </TextField>

                                    <Box sx={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1}}>
                                    {   selectedStep.options &&
                                        selectedStep.options.map((option: Option, index: number) => (
                                            <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                                            <TextField value={option.optionCTA} type='text' label={`Choice ${index + 1} CTA`} size="small" />
                                            <DeleteIcon/>
                                            </Box>
                                        ))
                                    }
                                    {   selectedStep.options &&
                                        selectedStep.options.length <= 3 ? <Button onClick={() => addNewStep(selectedStep.id)}>Add New Step</Button> : null
                                    }
                                    </Box>
                                </Box>
                            </Box>
                        ) : (
                            <Box height={'100%'} width={'100%'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                                <Typography>Select a step to start editing.</Typography>
                            </Box>
                        )
                    }  
            </Box>
            </Slide>
        </Box>
    )
}