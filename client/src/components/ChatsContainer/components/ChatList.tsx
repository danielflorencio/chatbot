import { Avatar, List, ListItem, ListItemIcon, ListItemText, Tooltip} from "@mui/material";
import { useAppDispatch, useConversationsInMemory} from "../../../hooks";
import { setNewCurrentChatId } from "../../../features/sessionControl/chatSlice";
import useMediaQuery from '@mui/material/useMediaQuery';
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
    </List>
    )
}