import { Fab, Grid, Divider, TextField, List } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import {io} from "socket.io-client";
import { useEffect, useState } from "react";
import { Message } from "../../../../types/message";
import MessageComponent from "./components/Message";
import { useAppDispatch, useAppSelector, useConversationsInMemory, useCurrentChatId } from "../../../../hooks";
import { sendMessage, setConversationOnScreen, setConversationOnScreenValues } from "../../../../features/sessionControl/chatSlice";
import { useUserEmail } from "../../../../hooks";

const socket = io("http://localhost:3001");

type CurrentChatProps = {
    currentChatId: string
}
export default function CurrentChat({currentChatId}: CurrentChatProps){


    
    const [messageInput, setMessageInput] = useState<string>('');
    const conversationOnScreen = useAppSelector(state => state.chat.conversationOnScreen);
    const conversationsInMemory = useConversationsInMemory();
    console.log('conversations in memory on startup: ----------------------------------', conversationsInMemory)
    console.log('conversations on Screen on startup: ----------------------------------', conversationOnScreen)
    // const dispatch = useAppDispatch();
    // const currentChatId = useCurrentChatId();

    const loggedUser = useUserEmail();    
    // const conversationOnScreen = useAppSelector(state => {
    //     const newConversationOnScreenIndex = state.chat.conversationsInMemory.findIndex(conversation => conversation.customerId === currentChatId && conversation.adminId === loggedUser)
    //     const getConversationOnScreen = useConversationsInMemory()
    //     return getConversationOnScreen[newConversationOnScreenIndex];
    // });

    const dispatch = useAppDispatch();

    // useEffect(() => {
    //     const conversationIndex = conversationsInMemory.findIndex(
    //         conversation => conversation.customerId === currentChatId && conversation.adminId === loggedUser
    //       );
    //     dispatch(setConversationOnScreenValues(conversationsInMemory[conversationIndex]));
    // }, [conversationsInMemory])

    const joinRoom = () => {
        socket.emit("join_room",)
    }

    const handleSubmit = () =>{
        let message: Message = {content: messageInput, senderType: "admin", date: new Date().toISOString(), adminReference: loggedUser, customerReference: currentChatId}
        dispatch(sendMessage(message.content));
        setMessageInput('');
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
                    <Fab color="primary" aria-label="add"><SendIcon onClick={() => handleSubmit()} /></Fab>
                </Grid>
            </Grid>
        </Grid>
    )
}
// Credits for this component's UI:
// https://medium.com/@awaisshaikh94/chat-component-built-with-react-and-material-ui-c2b0d9ccc491