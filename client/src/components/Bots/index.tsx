import { Grid, Paper } from "@mui/material";
import BotConfig from "./BotConfig";
import BotPreview from "./BotPreview";


export default function BotsPage(){

    return(
        <Grid container component={Paper} sx={{ marginTop: 3, padding: 2, display: 'flex', justifyContent: 'space-between', flexWrap: 'nowrap'}}>
            <Grid item flex={1} paddingRight={2}>
                <BotConfig></BotConfig>
            </Grid>
            <Grid item minWidth={380}>
                <BotPreview></BotPreview>
            </Grid>
        </Grid>
    )
}