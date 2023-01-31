import CssBaseline from '@mui/material/CssBaseline';
import SignIn from './assets/pages/SignInPage/SignInPage';
import UserPage from './assets/pages/UserPage/UserPage';
import {Container} from '@mui/material';

export default function App() {
  return (
    <>
      <CssBaseline enableColorScheme/>
      <Container sx={{ height: '100vh', width: 1}}>
        <UserPage/>        
      </Container>
    </>
  )
}