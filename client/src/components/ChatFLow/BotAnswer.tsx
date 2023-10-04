import { Box, IconButton, TextField } from "@mui/material";
import { useEffect,  useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
export default function BotAnswer(
    {
        index,
        answer,
        // handleBotAnswerChange
    }:
    {
        index: number,
        answer: string,
        // handleBotAnswerChange: (newBotAnswer: string, index: number) => void
    }
){

    const [newAnswerState, setNewAnswerState] = useState<string>(answer);
    const [viewMode, setViewMode] = useState(true);

    useEffect(() => {
        setNewAnswerState(answer)
    }, [answer])

    const handleChangeMode = () => {
        setViewMode(!viewMode)
    }

    return(
        <Box sx={{display: 'flex', gap: 1}}>

            <TextField disabled={viewMode ? true : false} fullWidth type='text' label={`Response ${index + 1}`} size='small' value={newAnswerState} onChange={(e) => setNewAnswerState(e.target.value)}/>
            <IconButton aria-label="delete">
                {viewMode ? <EditIcon onClick={() => handleChangeMode()}/> : <CheckIcon onClick={() => handleChangeMode()}/>}
            </IconButton>
        </Box>
    )
}