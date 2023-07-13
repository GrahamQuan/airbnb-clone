import { NextResponse } from 'next/server'
import prisma from '@/app/libs/prismadb'
import getCurrentUser from '@/app/actions/getCurrentUser'

type ParamsType = {
  params: {
    listingId?: string
  }
}

export const POST = async (request: Request, { params }: ParamsType) => {
  const user = await getCurrentUser()
  if (!user) {
    return NextResponse.error()
  }

  const { listingId } = params

  if (!listingId || typeof listingId !== 'string') {
    throw new Error('Invalid ID')
  }

  const favoriteIds = [...(user.favoriteIds || [])]

  favoriteIds.push(listingId)

  const updatedUser = await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      favoriteIds,
    },
  })

  return NextResponse.json(updatedUser)
}

export const DELETE = async (request: Request, { params }: ParamsType) => {
  const user = await getCurrentUser()
  if (!user) {
    return NextResponse.error()
  }

  const { listingId } = params

  if (!listingId || typeof listingId !== 'string') {
    throw new Error('Invalid ID')
  }

  let favoriteIds = [...(user.favoriteIds || [])]
  favoriteIds = favoriteIds.filter((id) => id !== listingId)
  const updatedUser = await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      favoriteIds,
    },
  })

  return NextResponse.json(updatedUser)
}
