import { Box, Divider, Fab, Grid, List, Paper, TextField } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import { useAppDispatch, useConversationsOnScreen, useCurrentChatId } from "../../hooks";
import MessageComponent from "../ChatsContainer/components/CurrentChat/components/Message";
import { sendMessage } from "../../features/sessionControl/chatSlice";
// import { useDispatch } from "react-redux";
import { useState } from "react";
import { useUserEmail } from "../../hooks";
export default function BotPreview(){

    const [messageInput, setMessageInput] = useState('');
    const conversationOnScreen = useConversationsOnScreen();
    const currentChatId = useCurrentChatId();
    const loggedUser = useUserEmail();
    const dispatch = useAppDispatch();

    const handleSubmit = () =>{
        sendNewMessage();
    }

    const sendNewMessage = async () => {
        const token = localStorage.getItem('token');
        console.log('sendNewMessage called.')
        const response = await fetch('http://localhost:3000/api/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `${token}`
              },
              body: JSON.stringify({
                adminReference: loggedUser,
                customerReference: currentChatId,
                content: messageInput,
                senderType: 'admin',
                date: new Date(),
            })
        })
        const data = await response.json();
        console.log('isResponseOk: ', response.ok)
        console.log('data: ', data)
        if(response.ok){
            dispatch(sendMessage(messageInput));
            setMessageInput('')
        }
    }

    return(
        <Box component={Paper} sx={{width: '400px', height: '80vh'}}>
            <List sx={{height: '70vh', overflowY: 'auto'}}>
                {conversationOnScreen.messages ? (conversationOnScreen.messages.map((message, index) => (
                    <div key={index}>
                        <MessageComponent index={index} content={message.content} senderType={message.senderType} date={message.date}/>
                    </div>
                ))) : (<div></div>)}
            </List>
            <Divider />
            <Grid container style={{padding: '20px'}}>
                <Grid item xs={11}>
                    <TextField id="text-message" label="Type Something" name="message" fullWidth value={messageInput} onChange={(e) => {e.preventDefault; setMessageInput(e.target.value)}} onKeyPress={(e) => {if (e.key === 'Enter') {handleSubmit();}}} />
                </Grid>
                <Grid item xs={1} sx={{textAlign: "right"}}>
                    <Fab color="primary" aria-label="add"><SendIcon onClick={() => handleSubmit()} /></Fab>
                </Grid>
            </Grid>
            {/* </Grid> */}
        </Box>
    )
}