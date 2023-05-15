import {useEffect, lazy} from 'react'
import CssBaseline from '@mui/material/CssBaseline';
import {Container} from '@mui/material';
import { Routes, Route } from 'react-router-dom';
// import SignIn from './pages/SignInPage/SignInPage';
// import SignUp from './pages/SingUpPage/SignUpPage';
// import UserPage from './pages/UserPage/UserPage';

const SignIn = lazy(() => import('./pages/SignInPage/SignInPage'));
const UserPage = lazy(() => import('./pages/UserPage/UserPage'));
const SignUp = lazy(() => import('./pages/SingUpPage/SignUpPage'));

export default function App() {
  
  return (
    <>
      <CssBaseline enableColorScheme/>
      <Container sx={{ height: '100vh', width: 1}}>
        <Routes>
          <Route path="/" element={<SignIn/>}/>
          <Route path="/sign-up" element={<SignUp/>}/>
          <Route path="/user-page" element={<UserPage/>}/>
        </Routes>  
      </Container>
    </>
  )
}