'use client'

import React from 'react'
import Image from 'next/image'

function AvatarName({ name }: { name: string }) {
  const getColor = () => {
    const colors = [
      'bg-red-500',
      'bg-yellow-500',
      'bg-green-500',
      'bg-blue-500',
      'bg-indigo-500',
      'bg-purple-500',
      'bg-pink-500',
      'bg-gray-500',
      'bg-teal-500',
      'bg-cyan-500',
    ]
    const index = name.charCodeAt(0) % colors.length
    return colors[index]
  }

  const getInitials = () => {
    const initials = name.match(/\b\w/g) || []
    return initials.join('').toUpperCase()
  }

  return (
    <div
      className={`w-[30px] h-[30px] rounded-full flex justify-center items-center ${getColor()} text-white font-bold text-base`}
    >
      {getInitials()}
    </div>
  )
}

interface AvatarProps {
  src: string | null | undefined
  name: string | null | undefined
}

const Avatar: React.FC<AvatarProps> = ({ src, name }) => {
  if (name && !src?.length) {
    return <AvatarName name={name} />
  }

  let imgSrc = '/images/placeholder.jpg'

  if (src) {
    imgSrc = src
  }

  return (
    <Image
      className="rounded-full"
      height="30"
      width="30"
      alt="Avatar"
      src={imgSrc}
    />
  )
}

export default Avatar
