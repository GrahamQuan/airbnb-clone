import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type SigninType = {
  isOpen: boolean
}

const initialState: SigninType = {
  isOpen: false,
}

export const signin = createSlice({
  name: 'register',
  initialState,
  reducers: {
    onRegisterOpen: (state) => {
      state.isOpen = true
    },
    onRegisterClose: (state) => {
      state.isOpen = false
    },
  },
})

export const { onRegisterOpen, onRegisterClose } = signin.actions
export default signin.reducer
