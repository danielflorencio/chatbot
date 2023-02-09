import { Action, createAsyncThunk, createSlice, ThunkAction } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import {  fetchUserLoginStatus } from '../../helpers/loginHelpers'
import { UserData } from '../../types/userData';
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






// const logUserInSuccess = (user: string): PayloadAction<string> => ({
//   type: 'session/logUserInSuccess',
//   payload: user,
// });


// export const loginUserThunk = createAsyncThunk(
//   'users/fetchById',
//   // Declare the type your function argument here:
//   async (email: string, password: string) => {
//     const response = await fetch(`http://localhost:3000/api/login`),{
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ 
//         email,
//         password
//       })
//     }
//     return (await response.json()) as Partial<UserData>)
//     // Inferred return type: Promise<MyData>
    
//   }
// )



// export const loginUser = (email: string, password: string): ThunkAction<void, SessionState, unknown, Action<string>> => async dispatch => {
//   try {
//     const response = await fetch('http://localhost:3000/api/login', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ 
//         email,
//         password
//       })
//     });
//     const data = await response.json();
//     if (data.user) {
//       localStorage.setItem('token', data.user);
//       // dispatch(logUserInSuccess(data.user));
//       window.location.href = '/user-page';
//     } else {
//       alert('Please check your username and password!');
//     }
//   } catch (error) {
//     console.error(error);
//   }
// };










export const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    logUserIn: (state, action: PayloadAction<Partial<UserData>>) => {
      console.log('logUserIn reducer being called');
      console.log('data being received by logUserIn reducer: ', action.payload);
      (async () => {
        console.log('async function being called.')
        const response = await fetch('http://localhost:3000/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            email: action.payload.email,
            password: action.payload.password
          })
        })
        const data = await response.json() 
        console.log('Data being received by the login api endpoint: ', data)
        if(data.user){
          localStorage.setItem('token', data.user)              
          window.location.href = '/user-page'
          state.userData.email = action.payload.email
          state.connectionError = false
          state.userIsLogged = true
        } else{
          alert('Please check your username and password!')
        }
      })();
    },
    login: (state, action: PayloadAction<Partial<UserData>>) => {
      // try{
      //   state.connectionError = logUserIn(action.payload.email, action.payload.password)
      // }catch(error){
      //   console.log(error)
      // }

    },
    logout: (state) => {
      localStorage.setItem('token', '')
      state.userIsLogged = false;
      state.connectionError = false;
      state.isLoading = false;
      window.location.href = '/sign-in'
    },
  },
})

// export const selectUserData = (state: RootState) => state.expenses.totalBalance
export const { logUserIn, login, logout } = sessionSlice.actions;

export const sessionActions = {
  ...sessionSlice.actions,
  // loginUser
}
export default sessionSlice.reducer