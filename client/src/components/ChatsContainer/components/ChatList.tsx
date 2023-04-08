import { Avatar, List, ListItem, ListItemIcon, ListItemText} from "@mui/material";
import { Conversations } from "../../../data/conversations";
import { Conversation } from "../../../types/conversation";
import { Customers } from "../../../data/customers";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { setNewCurrentChatId } from "../../../features/sessionControl/chatSlice";
interface ChatListProps {
    currentChatId: string;
    // setCurrentChatId: (chatId: string) => void;
}

export default function ChatList({ currentChatId }: ChatListProps){

    // Create an email useAppSelector here to use in the line below.

    // let conversationsToLoad = Conversations.filter(conversation => conversation.adminId === 'test@gmail.com');
    let conversationsToLoad: Conversation | undefined = Conversations.find(conversation => conversation.adminId === 'test@gmail.com' && currentChatId === conversation.customerId);

    let customers = Customers.filter(customer => customer.recipientId === 'test@gmail.com')

    const conversations = useAppSelector(state => state.chat.conversationsInMemory);

    const dispatch = useAppDispatch();


    // if(Conversations.filter(conversation => conversation.adminId === 'test@gmail.com') !== null){
    //     conversationsToLoad = Conversations.filter(conversation => conversation.adminId === 'test@gmail.com');
    // }

    // = Conversations.filter(conversation => conversation.adminId === 'test@gmail.com');

    const handleSelectConversation = (index: number) => {
        // setCurrentChatId(customers[index].senderReference);
        console.log('customers[index].senderReference: ', customers[index].senderReference)
        console.log('index: ', index)
        console.log('customers: ', customers)
        // console.log('currentChatId', )
        dispatch(setNewCurrentChatId(customers[index].senderReference));
    }
    
    return(
        <List>
        {
            customers ? (
            customers.map((customer, index) => (
                <ListItem button key={index} onClick={() => {handleSelectConversation(index)}}>
                <ListItemIcon>
                    <Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg" />
                </ListItemIcon>
                <ListItemText primary={customer.senderReference}></ListItemText>
            </ListItem>
            ))
            ) : (<div></div>)
        }

        {/* {conversationsToLoad?.map((customerConversation, index) => (
            <ListItem button key={index} onClick={() => {handleSelectConversation(index)}}>
                <ListItemIcon>
                    <Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg" />
                </ListItemIcon>
                <ListItemText primary={customerConversation.customerId}>Alice</ListItemText>
            </ListItem>
        ))} */}
        {/* <ListItem button key="RemySharp"> 
            <ListItemIcon>
                <Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg" />
            </ListItemIcon>
            <ListItemText primary="Remy Sharp">Remy Sharp</ListItemText>
            <ListItemText secondary="online" sx={{ textAlign: "right"}}></ListItemText>
        </ListItem>
        <ListItem button key="Alice">
            <ListItemIcon>
                <Avatar alt="Alice" src="https://material-ui.com/static/images/avatar/3.jpg" />
            </ListItemIcon>
            <ListItemText primary="Alice">Alice</ListItemText>
        </ListItem>
        <ListItem button key="CindyBaker">
            <ListItemIcon>
                <Avatar alt="Cindy Baker" src="https://material-ui.com/static/images/avatar/2.jpg" />
            </ListItemIcon>
            <ListItemText primary="Cindy Baker">Cindy Baker</ListItemText>
        </ListItem> */}
    </List>
    )
}