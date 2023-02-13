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
      
      const newUserData = produce(state.userData, secondDraft => {
        secondDraft = {
          ...state.userData,
          email: action.payload
        }
      })
      const newState = produce(state, draft => {
        draft = {
          ...state, 
          userData: newUserData
        }
      })

      state.userData = {...newUserData}

      // const newUserData = produce(state.userData, draft => {
      //   draft = {
      //     ...state.userData,
      //     email: action.payload
      //   }
      // })


      // state.userData = newUserData

      console.log('New state: ', state.userData.email)
      return newState
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