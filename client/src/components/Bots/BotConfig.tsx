import { Box, Button, Divider, TextField } from "@mui/material";
import { ChangeEvent, useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
export default function BotConfig(){
    
    const [greetingMessages, setGreetingMessages] = useState<string[]>(['First Greeting Message']);
    
    const handleGreetingMessageChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, indexToChange: number) => {
        e.preventDefault();
        let newGreetingMessagesState = [...greetingMessages]
        newGreetingMessagesState[indexToChange] = e.target.value
        setGreetingMessages([...newGreetingMessagesState])
    }

    const handleGreetingsMessageDelete = (indexToRemove: number) => {
        // e.preventDefault();
        let newGreetingMessagesState = [...greetingMessages]
        newGreetingMessagesState.splice(indexToRemove, 1)
        setGreetingMessages([...newGreetingMessagesState])        
    }

    return(

        // This component should become a StepMessage component. The NewMessage button should now be aligned side-by-side with the delete button.
        // Now, the BotConfig component should be a bigger component that lists all the steps. 
        // Each step should list all the StepMessage item components in the array.
        // Each Step should have more than one list of StepMessages to choose from. 

        <Box width={'100%'}>
            <Box component='form'>
                {
                    greetingMessages.map((greetingMessage, index) => (
                    <Box key={index}>
                        <TextField fullWidth placeholder="Greeting Message" value={greetingMessage} onChange={(e) => handleGreetingMessageChange(e, index)}/>
                        <Box sx={{marginTop: 1, display: 'flex', gap: 2}}>
                            <Button variant="outlined" color='error' startIcon={<DeleteIcon />} onClick={() => handleGreetingsMessageDelete(index)}> Delete </Button>
                            <Button variant="outlined" color='success' onClick={() => setGreetingMessages([...greetingMessages, ''])}>New Message</Button>
                        </Box>
                        <Divider sx={{marginY: 1}}/>
                    </Box>
                    ))
                }
                {/* <TextField fullWidth placeholder="Greeting Message" value={greetingMessages}/> */}
            </Box>
            {/* <Box> */}

            {/* </Box> */}
            <Divider sx={{marginTop: 1}}></Divider>
        </Box>

    )
}