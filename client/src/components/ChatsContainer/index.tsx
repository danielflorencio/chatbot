import { Avatar, Divider, List, ListItem, Paper, ListItemIcon, ListItemText, Tooltip } from "@mui/material";
import Grid from "@mui/material/Grid";
import ChatList from "./components/ChatList";
import CurrentChat from "./components/CurrentChat";
import {useEffect, useState} from 'react'
import { useAppDispatch, useConversationsInMemory, useCurrentChatId, useUserEmail } from "../../hooks";
import { fetchMessages, setConversationOnScreen, setConversationOnScreenValues, setConversationsInMemory, setNewCurrentChatId } from "../../features/sessionControl/chatSlice";
import { Conversation } from "../../types/conversation";
import useMediaQuery from '@mui/material/useMediaQuery';
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


  useEffect(() => {
    (async () => {
      const response = await fetch(`http://localhost:3000/api/messages?email=${email}`, {
        method: 'GET',
        headers: {
          "Content-type": "Application/json"
        }
      })
      const data = await response.json();
      console.log('get endpoint response: ', response);
      console.log('get endpoint data: ', data);
    })();
  }, [])


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