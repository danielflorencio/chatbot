import { Avatar, Divider, List, ListItem, Paper, ListItemIcon, ListItemText, Tooltip } from "@mui/material";
import Grid from "@mui/material/Grid";
import ChatList from "./components/ChatList";
import CurrentChat from "./components/CurrentChat";
import {useEffect, useState} from 'react'
import { useCurrentChatId, useUserEmail } from "../../hooks";
import { fetchMessages } from "../../features/sessionControl/chatSlice";
import useMediaQuery from '@mui/material/useMediaQuery';
import { store } from "../../store";
export default function ChatsContainer(){

  const currentChatId = useCurrentChatId();

  const email = useUserEmail();

  useEffect(() => {
    store.dispatch(fetchMessages(email));
  }, [email]);

  const matches = useMediaQuery('(max-width:600px)');
  const [displayState, setDisplayState] = useState<'none' | 'block'>('block')

  useEffect(() => {
    if(matches) {
        setDisplayState('none');
    } else{
        setDisplayState('block')
    }
  }, [matches])
  
  return(
  <Grid container component={Paper} sx={{width: 1, height: 'fit-content'}}>
    <Grid item sx={{borderRight: '1px solid #e0e0e0', width: {xs: 'fit-content', display: `${displayState}`}}}>
        <List>
            <Tooltip title='Remy Sharp' sx={{ display: {xs: 'none', md: 'contents'}}}> 
              <ListItem button key="RemySharp" sx={{width: 1, height: 1}}>
                  <ListItemIcon>
                  <Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg" />
                  </ListItemIcon>
                  <ListItemText primary="John Wick" sx={{ display: {xs: 'none', md: 'contents'}}}></ListItemText>
              </ListItem>
            </Tooltip>
        </List>
        <Divider />
        <ChatList displayState={displayState}/>
      </Grid>
    <CurrentChat currentChatId={currentChatId} />
  </Grid>
)
}