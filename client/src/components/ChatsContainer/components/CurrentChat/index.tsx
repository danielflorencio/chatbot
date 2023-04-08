import { Fab, Grid, Divider, TextField, List } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import {io} from "socket.io-client";
import { useState } from "react";
import { Message } from "../../../../types/message";
import MessageComponent from "./components/Message";
import { Conversations } from "../../../../data/conversations";
import { Conversation } from "../../../../types/conversation";
import { useAppDispatch, useAppSelector } from "../../../../hooks";
import { selectConversationsOnScreen, sendMessage } from "../../../../features/sessionControl/chatSlice";
import { current } from "@reduxjs/toolkit";

const socket = io("http://localhost:3001");

const initialMessagesData: Message[] = [
    {
      content: 'Hey, this is my first message, and I am an admin.',
      senderReference: '1',
      recipientReference: '1',
      senderType: 'admin',
      date: new Date().toISOString()
    },
    {
      content: "This is my first message, and I'm a customer.",
      senderReference: '1',
      recipientReference: '1',
      senderType: 'customer',
      date: new Date().toISOString()
    },
    {
      content: 'And this is just another message.',
      senderReference: '1',
      recipientReference: '1',
      senderType: 'admin',
      date: new Date().toISOString()
    }
]; 

type CurrentChatProps = {
    currentChatId: string,
    conversationToLoad: Conversation,
    messagesToLoad: Message[],
    conversationsOnMemory: Conversation[],
    setMessagesToLoad: (messages: Message[]) => void,
    setConversationToLoad: (Conversation: Conversation) => void,
    setConversationsOnMemory: (Conversations: Conversation[]) => void,

}
export default function CurrentChat({currentChatId, conversationToLoad, messagesToLoad, setMessagesToLoad, setConversationToLoad, setConversationsOnMemory, conversationsOnMemory}: CurrentChatProps){
    
    const [messageInput, setMessageInput] = useState<string>('');

    // const [sortedMessages, setSortedMessages] = useState(
    //     () => {const sortedMessages = [...initialMessagesData].sort((a, b) => a.date.getTime() - b.date.getTime());}
    // )

    const conversationOnScreen = useAppSelector(state => state.chat.conversationOnScreen);
    
    // currentChatId = useAppSelector(state => state.chat.currentChatId);

    // useEffect(() => {

    // }, [])
    const dispatch = useAppDispatch();


    const [chatMessages, setChatMessages] = useState<Message[] | undefined>(
        messagesToLoad
        // () => {
        //     const sortedMessages = [...messagesToLoad?].sort((a, b) => a.date.getTime() - b.date.getTime());
        //     return sortedMessages;
        // }
    );

    const joinRoom = () => {
        socket.emit("join_room",)
    }

    const handleSubmit = () =>{
        let message: Message = {content: messageInput, senderType: "admin", date: new Date().toISOString(), senderReference: '1', recipientReference: currentChatId}
        let newConversationToLoad: Conversation = {
            ...conversationToLoad,
            messages: [...conversationToLoad.messages, message]
        }

        // let conversationToChangeIndex = conversationsOnMemory.findIndex(conversation => currentChatId === conversationToLoad.customerId);

        // let newConversationsOnMemory: Conversation[] = {...conversationsOnMemory}
        // newConversationsOnMemory[conversationToChangeIndex] = newConversationToLoad;
        setConversationToLoad(newConversationToLoad)
        dispatch(sendMessage(message.content));
        // setConversationsOnMemory(newConversationsOnMemory)
        // setMessagesToLoad([...messagesToLoad, message]);
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