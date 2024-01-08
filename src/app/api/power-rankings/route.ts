import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import type { PowerRankings } from '@prisma/client'
const prisma = new PrismaClient()

export const POST = async (request: Request) => {
  const body: PowerRankings = await request.json()
  const team = await prisma.powerRankings.create({
    data: {
      position: Number(body.position),
      teamId: Number(body.teamId),
      competitionId: Number(body.competitionId)
    },
  })
  return NextResponse.json(team, { status: 201 })
}
