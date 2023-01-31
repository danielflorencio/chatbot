import CssBaseline from '@mui/material/CssBaseline';
// import Button from '@mui/material/Button';
import SignIn from './assets/pages/SignInPage/SignInPage';
import UserPage from './assets/pages/UserPage/UserPage';
import ChatsContainer from './components/ChatsContainer';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {Container, Typography} from '@mui/material';
const theme = createTheme();


export default function App() {
  return (
    <>
      <CssBaseline enableColorScheme/>
      <Container sx={{ height: '100vh', width: 1}}>
        <ChatsContainer/>
        {/* <Typography variant='caption'>Testing the Typography component.</Typography> */}
        {/* <Box sx>
          
        </Box> */}
      </Container>
  
      {/* <SignIn/> */}
      {/* <UserPage/> */}
      
    </>
  )
}