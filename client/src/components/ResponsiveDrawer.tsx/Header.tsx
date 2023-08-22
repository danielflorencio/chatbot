import { Button, Box, IconButton, Typography } from "@mui/material";
import Toolbar from '@mui/material/Toolbar';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks";
import { logout } from "../../features/sessionControl/sessionSlice";
import AccountMenu from "../AccountMenu/Index";
export default function Header({handleDrawerToggle}: {handleDrawerToggle: () => void}){

    const navigate = useNavigate();
    
    const dispatch = useAppDispatch();

    const handleLogout = async () => {
        dispatch(logout());
        navigate('/login');
    }

    return(
        <Toolbar sx={{display: 'flex', justifyContent: 'space-between'}}>
            <Box sx={{display: 'flex', alignItems: 'center'}}>
                <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2}}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" noWrap component="div" fontWeight={'550'}>
                Chatbot
                </Typography>
            </Box>
            {/* <Button variant='contained' sx={{fontWeight: 600}} onClick={handleLogout}>Logout</Button> */}
            <AccountMenu/>
        </Toolbar>
    )
}