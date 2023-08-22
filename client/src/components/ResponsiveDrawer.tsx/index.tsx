import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import { Toolbar, styled } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Sidebar from './Sidebar';
import Header from './Header';

const drawerWidth = 240;

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
//   children: string | JSX.Element | JSX.Element[] | (() => JSX.Element),
  children: React.ReactNode,
  window?: () => Window;
}

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  // padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));


export default function ResponsiveDrawer(props: Props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex', paddingBottom: 10 }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: `100%`,
        }}
      >
        <Header handleDrawerToggle={handleDrawerToggle}/>
      </AppBar>
      {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
      <Drawer
        container={container}
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
      >
      <DrawerHeader>
        <IconButton onClick={handleDrawerToggle}>
          {mobileOpen && <ChevronLeftIcon />}
        </IconButton>
      </DrawerHeader>
        <Sidebar handleDrawerToggle={handleDrawerToggle}/>
      </Drawer>
      <Box
        component="main"
        // sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
        // sx={{ flexGrow: 1, p: 3, width: '100%' }}
        sx={{ flexGrow: 1, width: '100%' }}
      >
        <Toolbar />
          {props.children}
      </Box>
    </Box>
  );
}