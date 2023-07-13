'use client'

import Image from 'next/image'
import { useCallback } from 'react'
import { useRouter } from 'next/navigation'

const Logo = () => {
  const router = useRouter()
  const goHome = useCallback(() => router.push('/'), [router])

  return (
    <Image
      onClick={goHome}
      className="hidden md:block cursor-pointer"
      src="/images/logo.png"
      height="100"
      width="100"
      alt="Airbnb Logo"
    />
  )
}

export default Logo
