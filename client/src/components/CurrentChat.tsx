import { ListItemText, Avatar, Fab, Paper, Grid, Box, Divider, TextField, Typography, List, ListItem } from "@mui/material";
// import {SendIcon, ListItemIcon} from '@mui/icons-material'
import { ListItemIcon} from '@mui/material'
import SendIcon from '@mui/icons-material/Send';


export default function CurrentChat(){
    return(
        <Grid container component={Paper} sx={{width: 1, height: '100%'}}>
            <Grid item xs={3} sx={{borderRight: '1px solid #e0e0e0'}}>
                <List>
                    <ListItem button key="RemySharp">
                        <ListItemIcon>
                        <Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg" />
                        </ListItemIcon>
                        <ListItemText primary="John Wick"></ListItemText>
                    </ListItem>
                </List>
                <Divider />
                <Grid item xs={12} style={{padding: '10px'}}>
                    <TextField id="outlined-basic-email" label="Search" variant="outlined" fullWidth />
                </Grid>
                <Divider />
                <List>
                    <ListItem button key="RemySharp">
                        <ListItemIcon>
                            <Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg" />
                        </ListItemIcon>
                        <ListItemText primary="Remy Sharp">Remy Sharp</ListItemText>
                        <ListItemText secondary="online" sx={{ textAlign: "right"}}></ListItemText>
                    </ListItem>
                    <ListItem button key="Alice">
                        <ListItemIcon>
                            <Avatar alt="Alice" src="https://material-ui.com/static/images/avatar/3.jpg" />
                        </ListItemIcon>
                        <ListItemText primary="Alice">Alice</ListItemText>
                    </ListItem>
                    <ListItem button key="CindyBaker">
                        <ListItemIcon>
                            <Avatar alt="Cindy Baker" src="https://material-ui.com/static/images/avatar/2.jpg" />
                        </ListItemIcon>
                        <ListItemText primary="Cindy Baker">Cindy Baker</ListItemText>
                    </ListItem>
                </List>
            </Grid>
            <Grid item xs={9}>
                <List sx={{height: '70vh', overflowY: 'auto'}}>
                    <ListItem key="1">
                        <Grid container>
                            <Grid item xs={12}>
                                <ListItemText sx={{textAlign:"right"}} primary="Hey man, What's up ?"></ListItemText>
                            </Grid>
                            <Grid item xs={12}>
                                <ListItemText sx={{textAlign:"right"}} secondary="09:30"></ListItemText>
                            </Grid>
                        </Grid>
                    </ListItem>
                    <ListItem key="2">
                        <Grid container>
                            <Grid item xs={12}>
                                <ListItemText sx={{textAlign:"left"}} primary="Hey, Iam Good! What about you ?"></ListItemText>
                            </Grid>
                            <Grid item xs={12}>
                                <ListItemText sx={{textAlign:"left"}} secondary="09:31"></ListItemText>
                            </Grid>
                        </Grid>
                    </ListItem>
                    <ListItem key="3">
                        <Grid container>
                            <Grid item xs={12}>
                                <ListItemText sx={{ textAlign:"right"}} primary="Cool. i am good, let's catch up!"></ListItemText>
                            </Grid>
                            <Grid item xs={12}>
                                <ListItemText sx={{textAlign:"right"}} secondary="10:30"></ListItemText>
                            </Grid>
                        </Grid>
                    </ListItem>
                </List>
                <Divider />
                <Grid container style={{padding: '20px'}}>
                    <Grid item xs={11}>
                        <TextField id="outlined-basic-email" label="Type Something" fullWidth />
                    </Grid>
                    <Grid item xs={1} sx={{textAlign: "right"}}>
                        <Fab color="primary" aria-label="add"><SendIcon /></Fab>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

// Credits for this UI's component:
// https://medium.com/@awaisshaikh94/chat-component-built-with-react-and-material-ui-c2b0d9ccc491