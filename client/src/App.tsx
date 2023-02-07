import {useEffect, lazy} from 'react'
import CssBaseline from '@mui/material/CssBaseline';
import {Container} from '@mui/material';
import { Routes, Route } from 'react-router-dom';


const SignIn = lazy(() => import('./pages/SignInPage/SignInPage'));
const UserPage = lazy(() => import('./pages/UserPage/UserPage'));
const SignUp = lazy(() => import('./pages/SingUpPage/SignUpPage'));

// import SignIn from './pages/SignInPage/SignInPage';
// import UserPage from './pages/UserPage/UserPage';
// import SignUp from './pages/SingUpPage/SignUpPage';


export default function App() {
  useEffect(() => {
    const token = localStorage.getItem('token')
    if(token){
      (async () => {
        const response = await fetch('http://localhost:3000/api/verifyStatus', {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify({
            token: token
          })
        })
        const data = await response.json()
        if (data.status !== 'ok'){
          window.location.href = '/sign-in'
        }
      })();
    }
  }, [])
  
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