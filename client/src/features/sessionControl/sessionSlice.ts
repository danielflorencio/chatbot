import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import fetchUserLoginStatus from '../../helpers/loginHelpers'
import { UserData } from '../../types/userData';
export interface SessionState {
  loggedInUser: UserData | null,
  userIsLogged: boolean,
  token: string | null,
  connectionError: boolean, 
  isLoading: boolean
}

let initialState: SessionState = {
  loggedInUser: null,
  userIsLogged: false,
  token: null,
  connectionError: false,
  isLoading: true
};

(async () => {
  initialState = await fetchUserLoginStatus();
})

export const sessionSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<Partial<UserData>>) => {
      localStorage.setItem
    },
    logout: (state) => {
      localStorage.setItem('token', '')
      state.userIsLogged = false;
      state.connectionError = false;
      state.isLoading = false;
      state.loggedInUser = null;
      window.location.href = '/sign-in'
    },
  },
})

// Action creators are generated for each case reducer function
export const { login, logout } = sessionSlice.actions

export default sessionSlice.reducer