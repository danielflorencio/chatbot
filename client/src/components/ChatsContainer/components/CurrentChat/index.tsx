import { Fab, Grid, Divider, TextField, List } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import {io} from "socket.io-client";
import { useState } from "react";
import { Message } from "../../../../types/message";
import MessageComponent from "./components/Message";

const socket = io("http://localhost:3001");

const initialMessagesData: Message[] = [
    {
      content: 'Hey, this is my first message, and I am an admin.',
      senderReference: '1',
      recipientReference: '1',
      senderType: 'admin',
      date: new Date()
    },
    {
      content: "This is my first message, and I'm a customer.",
      senderReference: '1',
      recipientReference: '1',
      senderType: 'customer',
      date: new Date()
    },
    {
      content: 'And this is just another message.',
      senderReference: '1',
      recipientReference: '1',
      senderType: 'admin',
      date: new Date()
    }
]; 

const sortedMessages = [...initialMessagesData].sort((a, b) => a.date.getTime() - b.date.getTime());

export default function CurrentChat(){

    const [messageInput, setMessageInput] = useState<string>('');

    const [chatMessages, setChatMessages] = useState<Message[]>(sortedMessages);

    // const [chatMessages, setChatMessages] = useState<Promise<Message[]>>(<Promise>)

    // const [chatMessages, setChatMessages] = useState<Promise<Message[]>>(
    //     // (async () => {
    //     //     const response = await fetch('http://localhost:3001/getMessages', {
    //     //         method: 'GET',
    //     //         headers: {
    //     //           'Content-Type': 'application/json',
    //     //         },
    //     //         body: JSON.stringify({ 
    //     //         //   email: email,
    //     //         //   password: password
    //     //         })
    //     //     })
    //     //     const data = await response.json();
    //     //     return data;
    //     // })();
    // );
            
    // doSomething();
            

    const joinRoom = () => {
        socket.emit("join_room",)
    }

    const handleSubmit = () =>{
        // (async () => {
        //     // Send data to the server
        // })();
        let message: Message = {content: messageInput, senderType: "admin", date: new Date, senderReference: '1', recipientReference: '1'}
        setChatMessages([...chatMessages, message])
        setMessageInput('');
    }
    return(
        <Grid item xs={9}>
            <List sx={{height: '70vh', overflowY: 'auto'}}>
                {chatMessages ? (chatMessages.map((message, index) => (
                    <div key={index}>
                        <MessageComponent index={index} content={message.content} senderType={message.senderType} date={message.date}/>
                    </div>
                ))) : (<div>empty</div>)}
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