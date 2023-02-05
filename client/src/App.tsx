import CssBaseline from '@mui/material/CssBaseline';
import SignIn from './assets/pages/SignInPage/SignInPage';
import UserPage from './assets/pages/UserPage/UserPage';
import {Container} from '@mui/material';
import SignUp from './assets/pages/SingUpPage/SignUpPage';
import { Routes, Route } from 'react-router-dom';
import {useEffect} from 'react'
import Sidebar from './components/Sidebar';
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
          <Route path="/sign-in" element={<SignIn/>}/>
          <Route path="/sign-up" element={<SignUp/>}/>
          <Route path="/user-page" element={<UserPage/>}/>
        </Routes>  
      </Container>
    </>
  )
}