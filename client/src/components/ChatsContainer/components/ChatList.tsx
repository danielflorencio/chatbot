import { Avatar, List, ListItem, ListItemIcon, ListItemText, Tooltip} from "@mui/material";
import { useAppDispatch, useConversationsInMemory} from "../../../hooks";
import { setNewCurrentChatId } from "../../../features/sessionControl/chatSlice";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useEffect, useState } from "react";
export default function ChatList({displayState}: {displayState: 'none' | 'block'}){

    const conversationsInMemory = useConversationsInMemory();
    
    const customers = conversationsInMemory.map(conversation => {
        return conversation.customerId;
    })

    const dispatch = useAppDispatch();

    const handleSelectConversation = (index: number) => {
        dispatch(setNewCurrentChatId(customers[index]));
    }

    const matches = useMediaQuery('(max-width:600px)');
    // const [displayState, setDisplayState] = useState<'none' | 'contents'>('contents')

    console.log('matches: ', matches)
    
    // useEffect(() => {
    //     if(matches) {
    //         setDisplayState('none');
    //     } else{
    //         setDisplayState('contents')
    //     }
    // }, [matches])

    return(
        <List sx={{display: `${displayState}`}}>
        {
            customers ? (
            customers.map((customer, index) => (
            <Tooltip key={index} title={`${customer}`} sx={{ display: {xs: 'none', md: 'contents'}}}> 
            {/* <ListItem button key={index} onClick={() => {handleSelectConversation(index)}} sx={{width: 1, height: 1}}>             */}
            {/* <ListItem button key={index} onClick={() => {handleSelectConversation(index)}} sx={{width: {xs: 'fit-content', md: 1}, height: 1}}>    */}
            {/* <ListItem button key={index} onClick={() => {handleSelectConversation(index)}} sx={{width: {xs: 'fit-content'}, height: 1}}>    */}
            <ListItem button onClick={() => {handleSelectConversation(index)}} sx={{width: {xs: 'fit-content'}}}>
                <ListItemIcon>
                    <Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg" />
                </ListItemIcon>
                <ListItemText primary={customer} sx={{ display: {xs: 'none', md: 'contents'}}}></ListItemText>
            </ListItem>
            </Tooltip>
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