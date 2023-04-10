import { Avatar, Divider, List, ListItem, Paper, ListItemIcon, ListItemText } from "@mui/material";
import Grid from "@mui/material/Grid";
import ChatList from "./components/ChatList";
import CurrentChat from "./components/CurrentChat";
import {useEffect} from 'react'
import { useAppDispatch, useConversationsInMemory, useCurrentChatId, useUserEmail } from "../../hooks";
import { setConversationOnScreen, setConversationsInMemory } from "../../features/sessionControl/chatSlice";
import { Conversation } from "../../types/conversation";
export default function ChatsContainer(){

  const currentChatId = useCurrentChatId();

  const email = useUserEmail();
  const conversationsInMemory = useConversationsInMemory();

  const dispatch = useAppDispatch();
  useEffect(() => {    
    console.log('useEffect being called.');
    (async () => {
      console.log('async function being called.')
      const response = await fetch('http://localhost:3000/api/getOneChatMessages', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          email: email
        })
      })
      const data = await response.json()
      console.log('data being received by the useEffect: ', data)
      if (data.status !== 'ok'){
        // window.location.href = '/'
      } else if(data.status === 'ok'){
        console.log('data: ', data);
        console.log('data.conversations: ', data.conversations);
        const conversations: Conversation[] = data.conversations.map((conversation: any) => {
          return {
            messages: conversation.messages.map((message: any) => {
              return {
                content: message.content,
                senderReference: message.senderReference,
                customerReference: conversation.customerId.phoneNumber,
                senderType: message.senderType,
                date: message.date
              }
            }),
            adminId: conversation.adminId,
            customerId: conversation.customerId.phoneNumber
          }
        });
        console.log('New conversations Data formatted: ', conversations)
        dispatch(setConversationsInMemory(conversations));
      }
      dispatch(setConversationOnScreen(currentChatId));
    })();

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