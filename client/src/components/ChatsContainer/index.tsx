import { Avatar, Divider, List, ListItem, Paper, ListItemIcon, ListItemText } from "@mui/material";
import Grid from "@mui/material/Grid";
import ChatList from "./components/ChatList";
import CurrentChat from "./components/CurrentChat";
import {useEffect, useState} from 'react'
import { Conversations } from "../../data/conversations";
import { Conversation } from "../../types/conversation";
import { useAppDispatch, useCurrentChatId } from "../../hooks";
import { setConversationOnScreen } from "../../features/sessionControl/chatSlice";
export default function ChatsContainer(){

  const [conversationsOnMemory, setConversationsOnMemory] = useState<Conversation[]>(Conversations);
  const [conversationToLoad, setConversationToLoad] = useState<Conversation>(conversationsOnMemory[conversationsOnMemory.length -1]);
  const dispatch = useAppDispatch();
  const currentChatId = useCurrentChatId();

  useEffect(() => {    
    dispatch(setConversationOnScreen(currentChatId))
  }, [currentChatId])

  useEffect(() => {    
    const conversationToChangeIndex = conversationsOnMemory.findIndex((conversation: Conversation) => currentChatId === conversation.customerId);
    let newConversationsOnMemory: Conversation[] = conversationsOnMemory.slice();
    newConversationsOnMemory[conversationToChangeIndex] = conversationToLoad
    setConversationsOnMemory(newConversationsOnMemory)
  }, [conversationToLoad])

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