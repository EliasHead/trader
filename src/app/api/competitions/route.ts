import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import type { Competition } from '@prisma/client'
const prisma = new PrismaClient()

export const POST = async (request: Request) => {
  const body: Competition = await request.json()
  const competition = await prisma.competition.create({
    data: {
      competition_name: body.competition_name,
      season_name: body.season_name,
    },
  })
  return NextResponse.json(competition, { status: 201 })
}
