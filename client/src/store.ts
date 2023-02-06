import { configureStore } from '@reduxjs/toolkit'
// ... import the reducers

export const store = configureStore({
  reducer: {
    // add the reducers to the store
    // sessionControl: login, logout
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch