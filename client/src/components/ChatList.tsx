import { Grid, Paper, Typography} from "@mui/material";

export default function ChatList(){
    return(
        <Paper variant="outlined" square sx={{height: '90%', width: '100%'}}>
            <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            height='100%'>
                <Grid item xs={1} style={{width: '100%'}}>
                    <Paper variant="outlined" square sx={{height: 1, width: 1}}>
                        <Typography variant="subtitle1">Profile</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={11} style={{width: '100%'}}>
                    <Paper variant="outlined" square sx={{height: 1, width: 1}} >
                        <Typography variant="subtitle1">Customers</Typography>
                    </Paper>
                </Grid>
            </Grid>
        </Paper>
        
    )
}