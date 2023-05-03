import { Fab, Grid, Divider, TextField, List } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import {io} from "socket.io-client";
import { useState } from "react";
import { Message } from "../../../../types/message";
import MessageComponent from "./components/Message";
import { useAppDispatch, useAppSelector } from "../../../../hooks";
import { sendMessage } from "../../../../features/sessionControl/chatSlice";
import { useUserEmail } from "../../../../hooks";

const socket = io("http://localhost:3001");

export default function CurrentChat({currentChatId} : {currentChatId: string}){
    console.log('currentChatId: ', currentChatId)
    const [messageInput, setMessageInput] = useState<string>('');
    const conversationOnScreen = useAppSelector(state => state.chat.conversationOnScreen);

    const loggedUser = useUserEmail();    

    const dispatch = useAppDispatch();

    const joinRoom = () => {
        socket.emit("join_room",)
    }

    const handleSubmit = () =>{
        // let message: Message = {content: messageInput, senderType: "admin", date: new Date().toISOString(), adminReference: loggedUser, customerReference: currentChatId}
        // dispatch(sendMessage(message.content));
        // setMessageInput('');
        sendNewMessage();
    }

    const sendNewMessage = async () => {
        console.log('sendNewMessage called.')
        const response = await fetch('http://localhost:3000/api/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
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
        <Grid item xs={9}>
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
                    <TextField id="outlined-basic-email" label="Type Something" fullWidth value={messageInput} onChange={(e) => {e.preventDefault; setMessageInput(e.target.value)}} onKeyPress={(e) => {if (e.key === 'Enter') {handleSubmit();}}} />
                </Grid>
                <Grid item xs={1} sx={{textAlign: "right"}}>
                    <Fab color="primary" aria-label="add"><SendIcon onClick={() => sendNewMessage()} /></Fab>
                </Grid>
            </Grid>
        </Grid>
    )
}
// Credits for this component's UI:
// https://medium.com/@awaisshaikh94/chat-component-built-with-react-and-material-ui-c2b0d9ccc491