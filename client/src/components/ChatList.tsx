import { Grid, Paper} from "@mui/material";

export default function ChatList(){
    return(
        <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        height='100%'
        >
        <Paper variant="outlined" square sx={{height: '100%', width: '100%'}}>
            <Grid item xs={2} style={{width: '100%'}}>
            <Paper variant="outlined" square sx={{height: 1}}>
                Profile
            </Paper>
            </Grid>
            <Grid item xs={10} style={{width: '100%'}}>
            <Paper variant="outlined" square >
                Customers
            </Paper>
            </Grid>
        </Paper>
        </Grid>
    )
}