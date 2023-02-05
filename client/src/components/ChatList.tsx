import { Grid, Paper, Typography} from "@mui/material";

export default function ChatList(){
    return(
        <Paper variant="outlined" square sx={{height: '90%', width: '100%'}}>
            <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            sx={{width: 1, height: 1}}>
                <Grid item xs={1} sx={{width: 1, height: 1}}>
                    <Paper variant="outlined" square sx={{height: 1, width: 1}}>
                        <Typography variant="subtitle1">Profile</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={11} sx={{width: 1, height: 1}}>
                    <Paper variant="outlined" square sx={{height: 1, width: 1}} >
                        <Typography variant="subtitle1">Customers</Typography>
                    </Paper>
                </Grid>
            </Grid>
        </Paper>
        
    )
}