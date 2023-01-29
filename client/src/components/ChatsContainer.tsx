import Grid from "@mui/material/Grid";
import Item from "@mui/material/Grid";
import ChatList from "./ChatList";
import CurrentChat from "./CurrentChat";
import Box from '@mui/material/Box';
import Paper from "@mui/material/Paper";
export default function ChatsContainer(){
  return(
      <>
        
        <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center">

        <Grid item xs={1}>
          <Paper elevation={3}>Hello</Paper> 
        {/* Box in the first row */}
        </Grid>
        <Grid item xs={10}>
          Second Item
        {/* Box in the second row */}
        </Grid>
        <Grid item xs={1}>
          Third item
        {/* Box in the third row */}
        </Grid>
        </Grid>
        {/* <ChatList/>
        <CurrentChat/> */}
      </>
  )
}
