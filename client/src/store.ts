import { configureStore, combineReducers } from '@reduxjs/toolkit'
import sessionSlice, { registerLoggedUserState } from './features/sessionControl/sessionSlice'
// import registerLoggedUserState from './features/sessionControl/sessionSlice'
import logout from './features/sessionControl/sessionSlice'
import counterSlice from './features/sessionControl/counterSlice'

// export const store = configureStore({
//   reducer: {
//     registerLoggedUserState, logout: sessionSlice
//     // logout: sessionSlice,
//     // registerLoggedUserState: sessionSlice
//   },
// })

// export const store = configureStore({
//   reducer: combineReducers({sessionSlice})
// })

export const store = configureStore({
  reducer: {
    session: sessionSlice,
    counter: counterSlice
  }
})

// const rootReducer = combineReducers({})
export type RootState = ReturnType<typeof store.getState>
// export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

