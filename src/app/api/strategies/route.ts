import { Strategies } from '@prisma/client'
import { db as prisma } from '@/lib/db'
import { NextResponse } from 'next/server'

export const GET = async () => {
  const strategies: Strategies[] = await prisma.strategies.findMany()

  return NextResponse.json(strategies, { status: 200 })
}
