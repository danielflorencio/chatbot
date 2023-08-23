import { Avatar, Divider, List, ListItem, Paper, ListItemIcon, ListItemText, Tooltip, Box } from "@mui/material";
import Grid from "@mui/material/Grid";
import ChatList from "./components/ChatList";
import CurrentChat from "./components/CurrentChat";
import { useCurrentChatId } from "../../hooks";

export default function ChatsContainer(){

  const currentChatId = useCurrentChatId();

  return(
  <Box sx={{display: 'flex', justifyContent: 'flexStart', alignItems: 'center', paddingTop: 3, paddingLeft: 3}}>
    <Box>
      <Grid container component={Paper}>
        <Grid item xs={4} sx={{borderRight: '1px solid #e0e0e0'}}>
            <List>
                <Tooltip title='Remy Sharp'> 
                  <ListItem button key="RemySharp" sx={{width: 1}}>
                    <ListItemIcon>
                    <Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg" />
                    </ListItemIcon>
                    <ListItemText primary="John Wick"></ListItemText>
                  </ListItem>
                </Tooltip>
            </List>
            <Divider />
            <ChatList/>
        </Grid>
        <CurrentChat currentChatId={currentChatId} />
      </Grid>
    </Box>
  </Box>
)
}