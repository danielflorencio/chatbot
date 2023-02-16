import { Grid, ListItemText } from "@mui/material";

export default function Message(){
    return(
        <Grid item xs={12}>
            <ListItemText sx={{textAlign:"left"}} primary="Hey, Iam Good! What about you ?"></ListItemText>
        </Grid>
    )
}