import { Avatar, Divider, List, ListItem, Paper, ListItemIcon, ListItemText } from "@mui/material";
import Grid from "@mui/material/Grid";
import ChatList from "./components/ChatList";
import CurrentChat from "./components/CurrentChat";
import {useEffect} from 'react'
import { useAppDispatch, useCurrentChatId } from "../../hooks";
import { setConversationOnScreen } from "../../features/sessionControl/chatSlice";
export default function ChatsContainer(){

  const dispatch = useAppDispatch();
  const currentChatId = useCurrentChatId();

  useEffect(() => {    
    // dispatch(setConversationOnScreen(currentChatId));
    // (async () => {
    //   const response = await fetch('http://localhost:3000/api/verifyStatus', {
    //     method: 'POST',
    //     headers: {
    //       'Content-type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //       token: token
    //     })
    //   })
    //   const data = await response.json()
    //   if (data.status !== 'ok'){
    //     window.location.href = '/'
    //   }
    // })();
  }, [currentChatId])

  return(
  <Grid container component={Paper} sx={{width: 1, height: '100%'}}>
    <Grid item xs={3} sx={{borderRight: '1px solid #e0e0e0'}}>
        <List>
            <ListItem button key="RemySharp">
                <ListItemIcon>
                <Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg" />
                </ListItemIcon>
                <ListItemText primary="John Wick"></ListItemText>
            </ListItem>
        </List>
        <Divider />
        <ChatList/>
      </Grid>
    <CurrentChat currentChatId={currentChatId} />
  </Grid>
)
}