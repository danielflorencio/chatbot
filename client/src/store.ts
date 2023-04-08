import { configureStore } from '@reduxjs/toolkit'
import sessionSlice from './features/sessionControl/sessionSlice'
import chatSlice from './features/sessionControl/chatSlice'

export const store = configureStore({
  reducer: {
    session: sessionSlice,
    chat: chatSlice
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch