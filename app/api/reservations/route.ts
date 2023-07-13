import { NextResponse } from 'next/server'
import prisma from '@/app/libs/prismadb'
import getCurrentUser from '@/app/actions/getCurrentUser'

export const POST = async (request: Request) => {
  try {
    const currentUser = await getCurrentUser()
    if (!currentUser) {
      return NextResponse.error()
    }

    const body = await request.json()

    const { totalPrice, startDate, endDate, listingId } = body

    if (!listingId || !startDate || !endDate || !totalPrice) {
      return NextResponse.error()
    }

    const reservation = await prisma.listing.update({
      where: {
        id: listingId,
      },
      data: {
        reservations: {
          create: {
            userId: currentUser.id,
            startDate,
            endDate,
            totalPrice,
          },
        },
      },
    })

    return NextResponse.json(reservation)
  } catch (error: any) {
    throw new Error(error)
  }
}
