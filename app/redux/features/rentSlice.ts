import { createSlice } from '@reduxjs/toolkit'

export type RentType = {
  isOpen: boolean
}

const initialState: RentType = {
  isOpen: false,
}

export const rent = createSlice({
  name: 'rent',
  initialState,
  reducers: {
    onRentOpen: (state) => {
      state.isOpen = true
    },
    onRentClose: (state) => {
      state.isOpen = false
    },
  },
})

export const { onRentOpen, onRentClose } = rent.actions
export default rent.reducer
