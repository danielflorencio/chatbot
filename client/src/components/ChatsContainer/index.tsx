import { Avatar, Divider, List, ListItem, Paper, ListItemIcon, ListItemText } from "@mui/material";
import Grid from "@mui/material/Grid";
import ChatList from "./components/ChatList";
import CurrentChat from "./components/CurrentChat";
import {useEffect, useState} from 'react'
import { Conversations } from "../../data/conversations";
import { Conversation } from "../../types/conversation";
import { Message } from "../../types/message";
import { useAppDispatch, useAppSelector, useCurrentChatId } from "../../hooks";
import { setConversationOnScreen } from "../../features/sessionControl/chatSlice";
export default function ChatsContainer(){

  const dispatch = useAppDispatch();

  // const [currentChatId, setCurrentChatId] = useState(() => { 
  //   const firstConversationToLoad = Conversations.filter(conversation => conversation.adminId === "test@gmail.com");
  //   return firstConversationToLoad[0].customerId;
  // })

  const currentChatId = useCurrentChatId();
  console.log('currentChatId: ', currentChatId)
  const [conversationsOnMemory, setConversationsOnMemory] = useState<Conversation[]>(Conversations);

  // const [conversationToLoad, setConversationToLoad] = useState<Conversation>(Conversations[Conversations.length - 1]);
  const [conversationToLoad, setConversationToLoad] = useState<Conversation>(conversationsOnMemory[conversationsOnMemory.length -1]);
  
  // const [messagesToLoad, setMessagesToLoad] = useState<Message[]>(
  //   () => {
  //       const sortedMessagesToLoad = conversationToLoad.messages.sort((a, b) => a.date.getTime() - b.date.getTime());
  //       return sortedMessagesToLoad;
  //   }
  // );

  useEffect(() => {    
    dispatch(setConversationOnScreen(currentChatId))
    console.log('currentChatId change detected on useEffect.')
    // for(let i = 0; i < Conversations.length; i++){
    //   if(Conversations[i].customerId === currentChatId){
    //     setConversationToLoad(Conversations[i])
    //     dispatch();
    //     // setMessagesToLoad(Conversations[i].messages)
    //     console.log('if statement being called.')
    //     break;
    //   }
    // }
  }, [currentChatId])

  useEffect(() => {    
    const conversationToChangeIndex = conversationsOnMemory.findIndex((conversation: Conversation) => currentChatId === conversation.customerId);
    // let conversationToChangeIndex = conversationsOnMemory.findIndex(conversation => currentChatId === conversationToLoad.customerId);
    let newConversationsOnMemory: Conversation[] = conversationsOnMemory.slice();
    // let newConversationsOnMemory: Conversation[] = {...conversationsOnMemory}
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
      <ChatList
          currentChatId={currentChatId}
          // setCurrentChatId={setCurrentChatId}
        />
  </Grid>
  <CurrentChat currentChatId={currentChatId} conversationsOnMemory={conversationsOnMemory} conversationToLoad={conversationToLoad} setConversationToLoad={setConversationToLoad} setConversationsOnMemory={setConversationsOnMemory}/>
</Grid>
)
}
