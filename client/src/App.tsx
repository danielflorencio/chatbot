import { lazy} from 'react'
import CssBaseline from '@mui/material/CssBaseline';
import {Container} from '@mui/material';
import { Routes, Route, Navigate, createBrowserRouter, RouterProvider } from 'react-router-dom';
import BotsPage from './components/Bots';
import ChatFlows from './components/ChatFLow/Index';
import CustomerSimulator from './components/CustomerSimulator';
import ProtectedRoute from './helpers/ProtectedRoute';
import ChatsContainer from './components/ChatsContainer';
import UserPage from './pages/UserPage/UserPage';
// import SignIn from './pages/SignInPage/SignInPage';
// import SignUp from './pages/SingUpPage/SignUpPage';
// import UserPage from './pages/UserPage/UserPage';

// const SignIn = lazy(() => import('./pages/SignInPage/SignInPage'));
// const UserPage = lazy(() => import('./pages/UserPage/UserPage'));
// const SignUp = lazy(() => import('./pages/SingUpPage/SignUpPage'));

// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <Navigate to="/home"/>
//   },
//   {
//     path: '/home', 
//     element: <UserPage/>,
//     children: [
//       {
//         path: '/home/chats',
//         element: <ProtectedRoute><ChatsContainer/></ProtectedRoute>
//       },
//       {
//         path: '/home/simulator',
//         element: <CustomerSimulator/>
//       },
//       {
//         path: '/home/bots',
//         element: <BotsPage/>
//       },
//       {
//         path: '/home/flows',
//         element: <ChatFlows/>
//       }
//     ]
//   }
// ])

export default function App() {
  
  return (
    <>
      <CssBaseline enableColorScheme/>
      <Container sx={{ height: '100vh', width: 1}}>
        {/* <RouterProvider router={router}/> */}
        {/* <Routes> */}
          {/* <Route path="/" element={<SignIn/>}/> */}
          {/* <Route path="/sign-up" element={<SignUp/>}/> */}
          {/* <Route path="/user-page" element={<UserPage/>}/> */}
          {/* <Route path='/bots' element={<BotsPage/>}/> */}
        {/* </Routes>   */}
      </Container>
    </>
  )
}