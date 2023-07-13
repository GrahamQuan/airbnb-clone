import { configureStore } from '@reduxjs/toolkit'
import registerReducer from './features/registerSlice'
import loginReducer from './features/loginSlice'
import rentReducer from './features/rentSlice'
import searchReducer from './features/searchSlice'

export const store = configureStore({
  reducer: {
    register: registerReducer,
    login: loginReducer,
    rent: rentReducer,
    search: searchReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
