import { createSlice, current } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import {  fetchUserLoginStatus } from '../../helpers/loginHelpers'
import { UserData } from '../../types/userData';
import { RootState } from '../../store';
import produce from 'immer'
// import UserPage from '../../pages/UserPage/UserPage';
// import UserPage from '../../pages/UserPage/UserPage';
export interface SessionState {
  userData: Partial<UserData>
  userIsLogged: boolean,
  token: string | null,
  connectionError: boolean, 
  isLoading: boolean
}

let initialState: SessionState = {
  userData: {email: '', password: '', firstName: '', lastName: ''},
  userIsLogged: false,
  token: null,
  connectionError: false,
  isLoading: true
};

(async () => {
  initialState = await fetchUserLoginStatus();
})

export const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    logUserIn: (state, action: PayloadAction<Partial<UserData>>) => {
      
      
      
      const newState:SessionState = {
        ...state,
        userData: {
          email: action.payload.email
        }
      }
      // let newUserData: UserData = {
      //   ...state.userData,
      //   email: action.payload.email;
      // }

      return newState
      // state.userData.email = action.payload.email
      // state.userIsLogged = true
      // window.location.href = '/user-page'
    },
    registerLoggedUserState: (state, action: PayloadAction<string>) => {
      // delete state.userData.email
      
      // let newState: SessionState = {
      //   ...state,
      //     userData: {
      //       ...state.userData,
      //       email: action.payload
      //   }
      // }

      // Object.assign(state, newState)
      return {
        ...state,
        userData: {
          ...state.userData,
          email: action.payload
        }
      }
      // console.log('registerLoggedUserState Payload: ', action.payload)
      // console.log('state registerLoggedUserState: ', state.userData)
      // console.log('state.userData.email after change: ', state.userData.email)
      // return {
      //   ...state,
      //   userData:{
      //     email: action.payload
      //   }
      // }
    },
    logout: (state) => {
      localStorage.clear()
      state.userIsLogged = false;
      state.connectionError = false;
      state.isLoading = false;
      state.userData = {email: '', firstName: '', lastName: '', password: ''}
      window.location.href = '/'
    },
  },
})



export const selectUserEmail = (state: RootState) => state.session.userData.email;
export const { logUserIn, logout, registerLoggedUserState } = sessionSlice.actions;
export const sessionActions = {
  ...sessionSlice.actions,
}
export default sessionSlice.reducer



// logUserIn: (state, action: PayloadAction<Partial<UserData>>) => {
//   console.log('logUserIn reducer being called');
//   console.log('data being received by logUserIn reducer: ', action.payload);
//   (async () => {
//     console.log('async function being called.')
//     const response = await fetch('http://localhost:3000/api/login', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ 
//         email: action.payload.email,
//         password: action.payload.password
//       })
//     })
//     const data = await response.json() 
//     console.log('Data being received by the login api endpoint: ', data)
//     if(data.user){
//       state = {
//         ...state, 
//         userData: { ...state.userData,
//           email: action.payload.email
//         },
//         connectionError: false,
//         userIsLogged: true
//       };

//       // return {
//       //   ...state,
//       //   userData: {
//       //     ...state.userData,
//       //     email: action.payload.email
//       //   },
//       //   connectionError: false,
//       //   userIsLogged: true
//       // }
//       // console.log('State.userData.email before attribution: ', state?.userData?.email)
//       // state.userData.email = action.payload.email
//       // console.log('State.userData.email after attribution: ', state.userData.email)
//       // state.connectionError = false
//       // state.userIsLogged = true
//       localStorage.setItem('token', data.user)              
//       window.location.href = '/user-page'

//     } else{
//       alert('Please check your username and password!')
//     }
//   })();
// },