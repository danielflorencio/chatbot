import { Grid, Paper, Typography } from "@mui/material";

export default function CurrentChat(){
    return(
        <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        height='90%'>
    
        <Grid item xs={1} width='100%'>
          <Paper variant="outlined" square sx={{height: '100%', width: '100%'}}>
            <Typography variant="subtitle1">John Doe</Typography> 
          </Paper>
        </Grid>
        <Grid item xs={10} width='100%'>
          <Paper variant="outlined" square sx={{height: '100%', width: '100%'}}>
            <Typography variant="subtitle1">Messages</Typography> 
          </Paper>
        </Grid>
        <Grid item xs={1} width='100%'>
          <Paper variant="outlined" square sx={{height: '100%', width: '100%'}}>
            <Typography variant="subtitle1">Send Message</Typography> 
          </Paper>
        </Grid>
        </Grid>
    )
}