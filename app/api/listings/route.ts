import getCurrentUser from '@/app/actions/getCurrentUser'
import { NextResponse } from 'next/server'
import prisma from '@/app/libs/prismadb'

export const POST = async (request: Request) => {
  const user = await getCurrentUser()
  if (!user) {
    return NextResponse.error()
  }

  const body = await request.json()
  const {
    title,
    description,
    imageSrc,
    category,
    roomCount,
    bathroomCount,
    guestCount,
    location,
    price,
  } = body

  Object.keys(body).forEach((value: any) => {
    if (!body[value]) {
      NextResponse.error()
    }
  })

  const listing = await prisma.listing.create({
    data: {
      title,
      description,
      imageSrc,
      category,
      roomCount,
      bathroomCount,
      guestCount,
      locationValue: location.value,
      price: parseInt(price, 10),
      userId: user.id,
    },
  })

  return NextResponse.json(listing)
}
