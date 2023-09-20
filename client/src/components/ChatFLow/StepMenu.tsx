import { Box, Divider, MenuItem, Paper, Slide, TextField, Typography } from "@mui/material";
import { Step } from "../../types/Step";
import { useStore } from "reactflow";
import { useEffect, useState } from "react";

export default function StepMenu(
    {
        open,
        selectedStep
    }:
    {
        open: boolean,
        selectedStep: Step | null | undefined
    }
){

    console.log('Selected step: ', selectedStep);

    const [choiceInputs, setChoiceInputs] = useState<string[]>([]);

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
                                <Typography variant='h6' sx={{marginBottom: 1}}>Em caso de PIZZA: </Typography>
                                <Divider/>
                                <TextField
                                select
                                label='Condition type'
                                fullWidth
                                value={'multiple-choice'}
                                sx={{marginTop: 2}}
                                >
                                    <MenuItem value={'multiple-choice'}>Multiple Choice</MenuItem>
                                </TextField>
                                <Box sx={{marginY: 1}}>
                                <Divider/>
                                <Typography variant='h6' sx={{marginBottom: 2}}>Case: </Typography>
                                {/* {
                                    selectedStep.options &&
                                    selectedStep.options.map((option, index) => (
                                        <Box key={index} sx={{display: 'flex', flexWrap: 'wrap', gap: 2}}>
                                            {
                                                choiceInputs.map((choiceInput: string, index: number) => (
                                                    <TextField 
                                                    type='text' 
                                                    value={choiceInput} 
                                                    label={`Choice number ${index}`}
                                                    sx={{width: '50%'}}
                                                    />
                                                ))
                                            }
                                        </Box>
                                    ))
                                } */}                                 
                                {/* <Box sx={{display: 'grid', flexDirection: 'row', gridTemplateColumns: '1fr 1fr', gap: 2}}> */}
                                <Box sx={{display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 1}}>
                                    {
                                        choiceInputs.map((choiceInput: string, index: number) => (
                                            <TextField 
                                            type='text' 
                                            value={choiceInput} 
                                            label={`Choice ${index}`}
                                            sx={{width: '49%', boxSizing: 'border-box'}}
                                            />
                                        ))
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