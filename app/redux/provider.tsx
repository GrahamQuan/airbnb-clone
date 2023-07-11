'use client'

import type { FC, ReactNode } from 'react'
import { store } from './store'
import { Provider } from 'react-redux'

type Props = {
  children: ReactNode
}

const ReduxProvider: FC<Props> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>
}

export default ReduxProvider
