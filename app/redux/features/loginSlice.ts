import { createSlice } from '@reduxjs/toolkit'

export type loginType = {
  isOpen: boolean
}

const initialState: loginType = {
  isOpen: false,
}

export const login = createSlice({
  name: 'login',
  initialState,
  reducers: {
    onLoginOpen: (state) => {
      state.isOpen = true
    },
    onLoginClose: (state) => {
      state.isOpen = false
    },
  },
})

export const { onLoginOpen, onLoginClose } = login.actions
export default login.reducer
