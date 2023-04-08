import { Divider, Fab, Grid, List, TextField } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import { useState } from "react";
import MessageComponentSimulator from "../ChatsContainer/components/CurrentChat/components/CustomerSimulatorMessage";

export default function CustomerSimulator(){

    const [customerId, setCustomerId] = useState('+55084998345849');

    return(
        <Grid item xs={9}>
            <List sx={{height: '70vh', overflowY: 'auto'}}>
                {conversationToLoad.messages ? (conversationToLoad.messages.map((message, index) => (
                    <div key={index}>
                        <MessageComponentSimulator index={index} content={message.content} senderType={message.senderType} date={message.date} type='standard'}/>
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