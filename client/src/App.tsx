import CssBaseline from '@mui/material/CssBaseline';
import SignIn from './assets/pages/SignInPage/SignInPage';
import UserPage from './assets/pages/UserPage/UserPage';
import {Container} from '@mui/material';
import SignUp from './assets/pages/SingUpPage/SignUpPage';
import { Routes, Route } from 'react-router-dom';

export default function App() {
  return (
    <>
      <CssBaseline enableColorScheme/>
      <Container sx={{ height: '100vh', width: 1}}>
        <Routes>
          <Route path="/sign-in" element={<SignIn/>}/>
          <Route path="/sign-up" element={<SignUp/>}/>
          <Route path="/user-page" element={<UserPage/>}/>
        </Routes>
      </Container>
    </>
  )
}