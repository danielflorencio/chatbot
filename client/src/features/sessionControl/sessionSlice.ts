import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import {  fetchUserLoginStatus } from '../../helpers/loginHelpers'
import { UserData } from '../../types/userData';
import { RootState } from '../../store';
import produce from 'immer';
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
    },
    registerLoggedUserState: (state, action: PayloadAction<string>) => {
      console.log('reducer being called.')
  
      console.log('state.userData.email before change: ', state.userData.email)
      

      // state.userData.email = action.payload // Value changed, but redux didn't detect it, so the reference didn't change.


      // Value changed, but the reference didn't.
      // state = {
      //   ...state,
      //   userData: {
      //     email: action.payload
      //   }
      // }

      // Value changed, but the reference didn't.
      const newState = {
        ...state, 
        userData: {
          email: action.payload
        }
      }
      state = newState;


      console.log('state.userData.email after change: ', state.userData.email)

      return state
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


export const selectUserIsLogged = (state: RootState) =>{return state.session.userIsLogged};
export const selectUserEmail = (state: RootState) =>{return state.session.userData.email};
export const { logUserIn, logout, registerLoggedUserState } = sessionSlice.actions;
export const sessionActions = {
  ...sessionSlice.actions,
}
export default sessionSlice.reducer