import CssBaseline from '@mui/material/CssBaseline';
// import Button from '@mui/material/Button';
import SignIn from './assets/pages/SignInPage/SignInPage';
import UserPage from './assets/pages/UserPage/UserPage';
import ChatsContainer from './components/ChatsContainer';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container/Container';
const theme = createTheme();


export default function App() {
  return (
    <>
      <CssBaseline enableColorScheme/>
      <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <ChatsContainer/>
      
      </Container>
      
      
      </ThemeProvider>
      {/* <SignIn/> */}
      {/* <UserPage/> */}
      
    </>
  )
}