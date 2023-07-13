import prisma from '@/app/libs/prismadb'

type ParamsType = {
  listingId?: string
  userId?: string
  authorId?: string
}

type QueryType = Omit<ParamsType, 'authorId'> & {
  listing?: { userId: string }
}

const getReservations = async (params: ParamsType) => {
  try {
    const { listingId, userId, authorId } = params
    const query: QueryType = {} as QueryType

    if (listingId) {
      query.listingId = listingId
    }
    if (userId) {
      query.userId = userId
    }
    if (authorId) {
      query.listing = { userId: authorId }
    }

    const reservations = await prisma.reservation.findMany({
      where: query,
      include: {
        listing: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })
    const safeReservations = reservations.map((reservation) => ({
      ...reservation,
      createdAt: reservation.createdAt.toISOString(),
      startDate: reservation.startDate.toISOString(),
      endDate: reservation.endDate.toISOString(),
      listing: {
        ...reservation.listing,
        createdAt: reservation.listing.createdAt.toISOString(),
      },
    }))
    return safeReservations
  } catch (error: any) {
    throw new Error(error)
  }
}

export default getReservations
