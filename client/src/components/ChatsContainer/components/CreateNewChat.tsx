import { Box, Button, ListItem, TextField } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addConversationInMemory } from "../../../features/sessionControl/chatSlice";
import { useUserEmail } from "../../../hooks";

export default function CreateNewChat(){

    const [componentState, setComponentState] = useState<'inactive' | 'active'>('inactive');
    const [inputFieldValue, setInputFieldValue] = useState<string>('');

    const loggedUser = useUserEmail();

    const dispatch = useDispatch();

    const handleClick = () => {
        if(componentState === 'inactive'){
            setComponentState('active')
        } else{
            setComponentState('inactive')
        }
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(inputFieldValue !== ''){
            const token = localStorage.getItem('token')
            const response = await fetch('http://localhost:3000/api/newConversation',{
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    'authorization': `${token}`
                },
                body: JSON.stringify({
                    adminReference: loggedUser,
                    newConversationPhoneNumber: inputFieldValue 
                })
            })
            const data = await response.json();
            if(response.ok){
                const userEmail = String(loggedUser)
                dispatch(addConversationInMemory({userEmail: userEmail, newCustomerNumber: inputFieldValue}));
                setInputFieldValue('');
            }
        }
        setComponentState('inactive');
    }

    return(
        <ListItem>
            {
                componentState === 'inactive' ? (
                    <Button fullWidth color="success" onClick={handleClick}>Create New Chat.</Button>
                ) : (
                    <Box component="form" onSubmit={(e) => handleSubmit(e)}>
                        <TextField fullWidth id="my-input" placeholder="Phone number" value={inputFieldValue} onChange={(e) => {e.preventDefault(); setInputFieldValue(e.target.value)}} aria-describedby="my-helper-text" />
                    </Box>
                )
            }
        </ListItem>
    )
}