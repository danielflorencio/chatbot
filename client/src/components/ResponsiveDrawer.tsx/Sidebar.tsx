import { Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';   
import PersonIcon from '@mui/icons-material/Person';
import VideocamIcon from '@mui/icons-material/Videocam';
import PlaceIcon from '@mui/icons-material/Place';
import { Link } from "react-router-dom";
import FilterAltIcon from '@mui/icons-material/FilterAlt';

export default function Sidebar({handleDrawerToggle}: {handleDrawerToggle: () => void}){
    return(
        <div>
            <Divider />
            <List>
                {['Chats'].map((text, index) => (
                    <Link to="/home/chats" onClick={handleDrawerToggle} key={index} style={{textDecoration: 'none', color: 'grey', padding: 0, margin: 0}}>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <HomeIcon />
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                    </Link>
                ))}
                </List>
                <Divider />
                    <List>
                        {['Simulator'].map((text, index) => (
                            <Link to="/home/simulator" onClick={handleDrawerToggle} key={index} style={{textDecoration: 'none', color: 'grey', padding: 0, margin: 0}}>
                                <ListItem disablePadding style={{margin: 0}}>
                                    <ListItemButton>
                                        <ListItemIcon>
                                            <PersonIcon/>
                                        </ListItemIcon>
                                        <ListItemText primary={text} />
                                    </ListItemButton>
                                </ListItem>
                            </Link>
                        ))}
                </List>
                <Divider />
                    <List>
                        {['Bots'].map((text, index) => (
                            <Link to="/home/bots" onClick={handleDrawerToggle} key={index} style={{textDecoration: 'none', color: 'grey', padding: 0, margin: 0}}>
                                <ListItem disablePadding style={{margin: 0}}>
                                    <ListItemButton>
                                        <ListItemIcon>
                                            <FilterAltIcon/>
                                        </ListItemIcon>
                                        <ListItemText primary={text} />
                                    </ListItemButton>
                                </ListItem>
                            </Link>
                        ))}
                </List>
                <Divider />
                    <List>
                        {['Flows'].map((text, index) => (
                            <Link to="/home/flows" onClick={handleDrawerToggle} key={index} style={{textDecoration: 'none', color: 'grey', padding: 0, margin: 0}}>
                                <ListItem disablePadding style={{margin: 0}}>
                                    <ListItemButton>
                                        <ListItemIcon>
                                            <VideocamIcon />
                                        </ListItemIcon>
                                        <ListItemText primary={text} />
                                    </ListItemButton>
                                </ListItem>
                            </Link>
                        ))}
                </List>
        </div>
    )
}