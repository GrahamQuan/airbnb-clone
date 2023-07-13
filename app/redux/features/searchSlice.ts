import { createSlice } from '@reduxjs/toolkit'

export type searchType = {
  isOpen: boolean
}

const initialState: searchType = {
  isOpen: false,
}

export const search = createSlice({
  name: 'search',
  initialState,
  reducers: {
    onSearchOpen: (state) => {
      state.isOpen = true
    },
    onSearchClose: (state) => {
      state.isOpen = false
    },
  },
})

export const { onSearchOpen, onSearchClose } = search.actions
export default search.reducer
