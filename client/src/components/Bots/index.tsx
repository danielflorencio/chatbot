import { Grid } from "@mui/material";
import BotConfig from "./BotConfig";
import BotPreview from "./BotPreview";


export default function BotsPage(){

    return(
        <Grid container>
            <Grid item>
                <BotConfig></BotConfig>
            </Grid>
            <Grid item>
                <BotPreview></BotPreview>
            </Grid>
        </Grid>
    )
}