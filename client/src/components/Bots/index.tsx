import { Grid, Paper } from "@mui/material";
import BotConfig from "./BotConfig";
import BotPreview from "./BotPreview";


export default function BotsPage(){

    return(
        <Grid container component={Paper} sx={{ marginTop: 3, padding: 2, display: 'flex', justifyContent: 'space-between'}}>
            <Grid item>
                <BotConfig></BotConfig>
            </Grid>
            <Grid item>
                <BotPreview></BotPreview>
            </Grid>
        </Grid>
    )
}