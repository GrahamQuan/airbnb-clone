import bcrypt from 'bcrypt'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import prisma from '@/app/libs/prismadb'

export const POST = async (req: NextRequest) => {
  const body = await req.json()
  const { email, name, password } = body

  const hashedPassword = await bcrypt.hash(password, 12)

  const user = await prisma.user.create({
    data: {
      email,
      name,
      hashedPassword,
    },
  })

  return NextResponse.json(user)
}
