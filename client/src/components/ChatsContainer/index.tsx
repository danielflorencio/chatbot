import { Avatar, Divider, List, ListItem, Paper, ListItemIcon, ListItemText } from "@mui/material";
import Grid from "@mui/material/Grid";
import ChatList from "./components/ChatList";
import CurrentChat from "./components/CurrentChat";
import {useEffect} from 'react'
import { useAppDispatch, useConversationsInMemory, useCurrentChatId, useUserEmail } from "../../hooks";
import { fetchMessages, setConversationOnScreen, setConversationOnScreenValues, setConversationsInMemory, setNewCurrentChatId } from "../../features/sessionControl/chatSlice";
import { Conversation } from "../../types/conversation";
import { store } from "../../store";
export default function ChatsContainer(){

  const currentChatId = useCurrentChatId();

  const email = useUserEmail();
  const conversationsInMemory = useConversationsInMemory();

  const dispatch = useAppDispatch();
  // fetchUserMessages(email);

  useEffect(() => {
    store.dispatch(fetchMessages(email));
  }, [email]);

  // useEffect(() => {
  //   // console.log('second useEffect being called.')
  //   console.log('newConversationsInMemory on UseEffect: ', conversationsInMemory)
  //   dispatch(setNewCurrentChatId(conversationsInMemory[0].messages[0].customerReference))
  //   const conversationIndex = conversationsInMemory.findIndex(
  //     conversation => conversation.customerId === currentChatId 
  //   );
  //   const newConversation: Conversation = conversationsInMemory[conversationIndex]
  //   // try{
  //   dispatch(setConversationOnScreenValues(newConversation))
  //   // }catch(error){
  //   //   console.log('ERROR: ', error)
  //   // }
  // }, [conversationsInMemory])

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