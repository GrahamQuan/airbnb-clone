import getCurrentUser from '@/app/actions/getCurrentUser'
import prisma from '@/app/libs/prismadb'
import { NextResponse } from 'next/server'

type ParamsType = {
  params: {
    listingId?: string
  }
}

export const DELETE = async (request: Request, { params }: ParamsType) => {
  try {
    const currentUser = await getCurrentUser()
    if (!currentUser) {
      return NextResponse.error()
    }
    const { listingId } = params
    if (!listingId || typeof listingId !== 'string') {
      throw new Error('Invalid ID')
    }

    const listing = await prisma.listing.deleteMany({
      where: {
        id: listingId,
        userId: currentUser.id,
      },
    })

    return NextResponse.json(listing)
  } catch (error: any) {
    throw new Error(error)
  }
}
