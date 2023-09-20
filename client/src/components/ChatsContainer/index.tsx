import { Avatar, Divider, List, ListItem, Paper, ListItemIcon, ListItemText, Tooltip, Box } from "@mui/material";
import Grid from "@mui/material/Grid";
import ChatList from "./components/ChatList";
import CurrentChat from "./components/CurrentChat";
import { useCurrentChatId } from "../../hooks";
import CustomerSimulator from "../CustomerSimulator";

export default function ChatsContainer(){

  const currentChatId = useCurrentChatId();

  return(
  <Box sx={{display: 'flex', paddingTop: 1, paddingLeft: 1, justifyContent: 'center', alignItems: 'center'}}>
    <Box>
      <Grid container component={Paper}>
        <Grid item sx={{borderRight: '1px solid #e0e0e0', display: 'flex', minWidth: '250px'}}>
            {/* <List>
                <Tooltip title='Remy Sharp'> 
                  <ListItem button key="RemySharp" sx={{width: 1}}>
                    <ListItemIcon>
                    <Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg" />
                    </ListItemIcon>
                    <ListItemText primary="John Wick"></ListItemText>
                  </ListItem>
                </Tooltip>
            </List>
            <Divider /> */}
            <ChatList/>
        </Grid>
        <CurrentChat currentChatId={currentChatId} />
        <CustomerSimulator/>
      </Grid>
    </Box>
  </Box>
)
}