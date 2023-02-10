import { configureStore, combineReducers } from '@reduxjs/toolkit'
import registerLoggedUserState from './features/sessionControl/sessionSlice'
import logout from './features/sessionControl/sessionSlice'
export const store = configureStore({
  reducer: {
    session: registerLoggedUserState, logout
    // logout: sessionSlice,
    // registerLoggedUserState: sessionSlice
  },
})

const rootReducer = combineReducers({})
export type RootState = ReturnType<typeof store.getState>
// export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch