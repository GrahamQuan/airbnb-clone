import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type loginType = {
  isOpen: boolean
}

const initialState: loginType = {
  isOpen: false,
}

export const signin = createSlice({
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

export const { onLoginOpen, onLoginClose } = signin.actions
export default signin.reducer
