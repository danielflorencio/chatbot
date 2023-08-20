import { Avatar, Divider, List, ListItem, Paper, ListItemIcon, ListItemText, Tooltip } from "@mui/material";
import Grid from "@mui/material/Grid";
import ChatList from "./components/ChatList";
import CurrentChat from "./components/CurrentChat";
import {useEffect, useState} from 'react'
import { useCurrentChatId } from "../../hooks";
import useMediaQuery from '@mui/material/useMediaQuery';
export default function ChatsContainer(){

  const currentChatId = useCurrentChatId();

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
  <Grid container component={Paper} sx={{width: 1}}>
    {/* <Grid item sx={{borderRight: '1px solid #e0e0e0', width: {xs: 'fit-content', display: `${displayState}`}}}> */}
    <Grid item sx={{borderRight: '1px solid #e0e0e0', width: {xs: 'fit-content'}}}>
        <List>
            <Tooltip title='Remy Sharp' sx={{ display: {xs: 'none', md: 'contents'}}}> 
              <ListItem button key="RemySharp" sx={{width: 1}}>
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