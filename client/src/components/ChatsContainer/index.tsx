import { Avatar, Divider, List, ListItem, Paper, ListItemIcon, ListItemText } from "@mui/material";
import Grid from "@mui/material/Grid";
import ChatList from "./components/ChatList";
import CurrentChat from "./components/CurrentChat";
import {useState} from 'react'
export default function ChatsContainer(){
  
  const [currentChatId, setCurrentChatId] = useState('')

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
      <ChatList
          currentChatId={currentChatId}
          setCurrentChatId={setCurrentChatId}
        />
  </Grid>
  <CurrentChat/>
</Grid>
)
}
