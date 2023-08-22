import { Avatar, List, ListItem, ListItemIcon, ListItemText, Tooltip} from "@mui/material";
import { useAppDispatch, useConversationsInMemory} from "../../../hooks";
import { setNewCurrentChatId } from "../../../features/sessionControl/chatSlice";
import CreateNewChat from "./CreateNewChat";
export default function ChatList(){

    const conversationsInMemory = useConversationsInMemory();
    
    const customers = conversationsInMemory.map(conversation => {
        return conversation.customerId;
    })

    const dispatch = useAppDispatch();

    const handleSelectConversation = (index: number) => {
        dispatch(setNewCurrentChatId(customers[index]));
    }
   
    return(
    <List sx={{maxHeight: '76vh', overflow: 'auto', minWidth: 'fit-content'}}>
        <CreateNewChat/>
        {
            customers ? (
            customers.map((customer, index) => (
            <Tooltip key={index} title={`${customer}`}> 
            <ListItem id={`chat-list-item-${index}`} button onClick={() => {handleSelectConversation(index)}} sx={{width: 1}}>
                <ListItemIcon>
                    <Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg" />
                </ListItemIcon>
                <ListItemText primary={customer}></ListItemText>
            </ListItem>
            </Tooltip>
            ))
            ) : (<div></div>)
        }
    </List>
    )
}