import { Container } from "@mui/material";
import Grid from "@mui/material/Grid";
import ChatList from "./ChatList";
import CurrentChat from "./CurrentChat";
export default function ChatsContainer(){
  return(
    <Container sx={{width: 1, height: 1}}>    
      <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      sx={{width: 1, height: 1}}>
        {/* <Grid xs={2.5} item sx={{width: 1, height: 1}}>
          <ChatList/>
        </Grid> */}
        <Grid xs={12} item sx={{width: 1, height: 1}}>
          <CurrentChat/>
        </Grid>
      </Grid>
    </Container>
  )
}
