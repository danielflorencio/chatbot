import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { Navigate, RouterProvider, createBrowserRouter} from 'react-router-dom'
import { store } from './store'
import { Provider } from 'react-redux'
import UserPage from './pages/UserPage/UserPage'
import ChatsContainer from './components/ChatsContainer'
import { Container, CssBaseline } from '@mui/material'
import CustomerSimulator from './components/CustomerSimulator'
import ChatFlows from './components/ChatFLow/ChatFlowProvider'
import ProtectedRoute from './helpers/ProtectedRoute'
import SignIn from './pages/SignInPage/SignInPage'
import SignUp from './pages/SingUpPage/SignUpPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/home/flows"/>
  },
  {
    path: '/home', 
    element: <UserPage/>,
    // element: <ProtectedRoute><UserPage/></ProtectedRoute>,
    children: [
      {
        path: '/home/chats',
        element: <ChatsContainer/>
      },
      {
        path: '/home/simulator',
        element: <CustomerSimulator/>
      },
      {
        path: '/home/flows',
        element: <ChatFlows/>
      }
    ]
  },
  {
    path: '/login',
    element: <SignIn/>
  },
  {
    path: '/sign-up',
    element: <SignUp/>
  }
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <CssBaseline enableColorScheme/> */}
      <Container id='main-container' sx={{ height: '100vh', minWidth: '100vw'}}>
        <RouterProvider router={router}/>
        {/* <App/> */}
      </Container>
    </Provider>
  </React.StrictMode>,
)