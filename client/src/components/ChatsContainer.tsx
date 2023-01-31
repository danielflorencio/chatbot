import Grid from "@mui/material/Grid";
import ChatList from "./ChatList";
import CurrentChat from "./CurrentChat";
export default function ChatsContainer(){
  return(
      <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      height='100%'>
        <Grid xs={2.5} item style={{height: '100%'}}>
          <ChatList/>
        </Grid>
        <Grid xs={9.5} item style={{height: '100%'}}>
          <CurrentChat/>
        </Grid>
      </Grid>
  )
}
