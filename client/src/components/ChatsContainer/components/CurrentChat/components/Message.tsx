import { Grid, ListItem, ListItemText } from "@mui/material";
import { useAppSelector } from "../../../../../hooks";

export default function MessageComponent({index, content, senderType, date}: {index: number; content: string; senderType: "admin" | "customer"; date: string;}){
    const email = useAppSelector(state => state.session.userData.email);

    // (async () => {
    //     const response = await fetch('http://localhost:getMessages/', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({
    //             email: email
    //         })
    //     })
    //     const data = await response.json();
    //     console.log('Data being received on the messages request: ', data)
    //     setMessages(data.messages);
    // })();

    return(
        <ListItem key={index}>
            <Grid container>
                <Grid item xs={12}>
                    <ListItemText sx={{textAlign: senderType === 'admin' ? 'right' : 'left'}} primary={content}></ListItemText>
                </Grid>
                <Grid item xs={12}>
                    {/* <ListItemText sx={{textAlign: senderType === 'admin' ? 'right' : 'left'}} secondary={date.getHours() + ':' + date.getMinutes()}></ListItemText> */}
                    <ListItemText sx={{textAlign: senderType === 'admin' ? 'right' : 'left'}} secondary={date}></ListItemText>
                </Grid>
            </Grid>
        </ListItem>
    )
}