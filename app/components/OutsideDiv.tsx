'use client'

import { useRef, useEffect } from 'react'

export default function OutsideDiv({
  children,
  onClickOutside,
  className,
}: {
  children: React.ReactNode
  onClickOutside: () => void
  className?: string
}) {
  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node) &&
        onClickOutside
      ) {
        onClickOutside()
      }
    }
    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [onClickOutside])

  return (
    <div ref={wrapperRef} className={className}>
      {children}
    </div>
  )
}
