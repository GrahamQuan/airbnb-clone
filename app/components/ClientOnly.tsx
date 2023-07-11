'use client'

import { useState, useEffect } from 'react'
import type { FC } from 'react'

type ClientOnlyProps = {
  children: React.ReactNode
}

const ClientOnly: FC<ClientOnlyProps> = ({ children }) => {
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setHasMounted(true)
  }, [])

  if (!hasMounted) return null

  return <>{children}</>
}

export default ClientOnly
