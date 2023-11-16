import { db as prisma } from '@/lib/db'

import { NextRequest, NextResponse } from 'next/server'

import bcrypt from 'bcrypt'

export const POST = async (request: NextRequest) => {
  const data = await request.json()
  const { name, email, password } = data

  console.log('Route handelle', data)

  if (!name || !email || !password) {
    return NextResponse.json('Dados inválidos.', { status: 400 })
  }

  const isUserExits = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (isUserExits) {
    return NextResponse.json({ error: 'E-mail já existente.' }, { status: 400 })
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  const user = await prisma.user.create({
    data: {
      email,
      name,
      hashedPassword,
    },
  })

  return NextResponse.json(user)
}
