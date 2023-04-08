import { Grid, ListItem, ListItemText } from "@mui/material";
import { useAppSelector } from "../../../../../hooks";

export default function MessageComponentSimulator({index, content, senderType, date}: {index: number; content: string; senderType: "admin" | "customer"; date: Date;}){
    const email = useAppSelector(state => state.session.userData.email);

    return(
        <ListItem key={index}>
            <Grid container>
                <Grid item xs={12}>
                    <ListItemText sx={{textAlign: senderType === 'customer' ? 'right' : 'left'}} primary={content}></ListItemText>
                </Grid>
                <Grid item xs={12}>
                    <ListItemText sx={{textAlign: senderType === 'customer' ? 'right' : 'left'}} secondary={date.getHours() + ':' + date.getMinutes()}></ListItemText>
                </Grid>
            </Grid>
        </ListItem>
    )
}