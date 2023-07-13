import getCurrentUser from '@/app/actions/getCurrentUser'
import prisma from '@/app/libs/prismadb'
import { NextResponse } from 'next/server'

type ParamsType = {
  params: {
    reservationId?: string
  }
}

export const DELETE = async (request: Request, { params }: ParamsType) => {
  try {
    const currentUser = await getCurrentUser()
    if (!currentUser) {
      return NextResponse.error()
    }

    const { reservationId } = params

    if (!reservationId || typeof reservationId !== 'string') {
      throw new Error('Invalid ID')
    }

    const reservation = await prisma.reservation.deleteMany({
      where: {
        id: reservationId,
        OR: [
          { userId: currentUser.id },
          {
            listing: {
              userId: currentUser.id,
            },
          },
        ],
      },
    })

    return NextResponse.json(reservation)
  } catch (error: any) {
    throw new Error(error)
  }
}
