import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import type { Leverage } from '@prisma/client'
const prisma = new PrismaClient()

export const POST = async (request: Request) => {
  const body: Leverage = await request.json()
  const leverage = await prisma.leverage.create({
    data: {
      goal: body.goal,
    },
  })
  return NextResponse.json(leverage, { status: 201 })
}
