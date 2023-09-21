import { Box, Button, Divider, MenuItem, Paper, Slide, TextField, Typography } from "@mui/material";
import { Step } from "../../types/Step";
import { useStore } from "reactflow";
import { useEffect, useState } from "react";
import NextStepConfig from "./NextStepConfig";
import AddResponseButton from "./AddResponseButton";

export default function StepMenu(
    {
        open,
        selectedStep
    }:
    {
        open: boolean,
        selectedStep: Step
    }
){

    console.log('Selected step: ', selectedStep);

    const [choiceInputs, setChoiceInputs] = useState<string[]>([]);
    const [triggerConditionType, setTriggerConditionType] = useState<string>('includes');
    const [conditionMessage, setConditionMessage] = useState<string>('');
    const [botAnswer, setBotAnswer] = useState<string[]>(['']);

    const handleBotAnswerChange = (newBotAnswer: string, index: number) => {
        let newBotAnswerState = botAnswer;
        newBotAnswerState[index] = newBotAnswer;
        setBotAnswer(newBotAnswerState);
    }

    useEffect(() => {
        if(selectedStep){
            if(selectedStep.options){
                let newChoiceInputsState: string[] = [];
                selectedStep.options.map((option) => newChoiceInputsState.push(option.optionCTA));
                setChoiceInputs(newChoiceInputsState);
            }
        } else {

        }
    }, [selectedStep])

    return(
        <Box sx={{position: 'absolute', right: 8, height: '90vh', display: 'flex', alignItems: 'center', zIndex: 1}}>    
            <Slide in={open}>
                <Box component={Paper} elevation={3} sx={{display: 'flex', flexDirection: 'column', minHeight: 500, minWidth: 380, borderRadius: 4}}>
                    {
                        selectedStep !== null && selectedStep !== undefined ? (
                            <Box sx={{padding: 2, display: 'flex', flexDirection: 'column'}}>
                                <Typography variant='h6' sx={{marginBottom: 2}}>Trigger condition </Typography>
                                <Box sx={{display: 'flex', gap: 1, marginBottom: 1}}>
                                <TextField
                                label='Condition Type'
                                select
                                value={triggerConditionType}
                                fullWidth
                                size='small'
                                >
                                    <MenuItem value='includes'>Messages include</MenuItem>
                                </TextField>
                                <TextField
                                type='text'
                                label='Condition messages'
                                fullWidth
                                value={conditionMessage}
                                onChange={(e) => setConditionMessage(e.target.value)}
                                size='small'
                                />
                                
                                </Box>
                                <Divider/>
                                <Typography variant='h6' sx={{marginBottom: 1}}>Response</Typography>
                                <Box sx={{display: 'flex', flexDirection: 'column', gap: 1}}>
                                {
                                    botAnswer.map((answer, index) => (
                                        <TextField disabled type='text' label='Response' size='small' value={answer} onChange={(e) => handleBotAnswerChange(e.target.value, index)}></TextField>
                                    ))
                                }
                                {botAnswer.length <= 4 ? <AddResponseButton/> : null}
                                </Box>
                                <Divider sx={{marginTop: 1}}/>                                
                                <Typography variant='h6' sx={{marginBottom: 1}}>Next step condition</Typography>
                                <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                                    <TextField 
                                    label='Step title'
                                    type='text'
                                    fullWidth
                                    size='small'
                                    />
                                    <TextField
                                    select
                                    label='Condition type'
                                    fullWidth
                                    value={'multiple-choice'}
                                    size='small'
                                    >
                                        <MenuItem value={'multiple-choice'}>Multiple Choice</MenuItem>
                                    </TextField>
                                </Box>
                                <Box sx={{marginY: 1}}>
                                <Divider/>
                                <Box>
                                </Box>

                                    {
                                        choiceInputs.map((choiceInput: string, index: number) => (
                                            <Box>
                                                <Typography variant='h6' sx={{marginBottom: 2}}>Case: {index + 1}</Typography>
                                                <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', gap: 1}}>
                                                <TextField 
                                                type='text' 
                                                value={choiceInput} 
                                                label={`Choice ${index}`}
                                                size="small"
                                                sx={{width: '49%', borderBox: 'box-sizing'}}
                                                />
                                                {selectedStep.options &&
                                                <NextStepConfig option={selectedStep.options[index]}/>
                                                }
                                                </Box>
                                                <Divider sx={{marginTop: 2, marginBottom: 1}}/>
                                            </Box>
                                        ))
                                    }
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