import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import type { PowerRankings } from '@prisma/client'
const prisma = new PrismaClient()

export const PATCH = async (
  request: Request,
  { params }: { params: { id: string } },
) => {
  const body: PowerRankings = await request.json()
  const powerRankings = await prisma.powerRankings.update({
    where: {
      powerRankingId: Number(params.id),
    },
    data: {
      position: Number(body.position),
      teamId: Number(body.teamId),
      competitionId: Number(body.competitionId),
    },
  })
  return NextResponse.json(powerRankings, { status: 200 })
}

export const DELETE = async (
  request: Request,
  { params }: { params: { id: string } },
) => {
  const powerRankings = await prisma.powerRankings.delete({
    where: {
      powerRankingId: Number(params.id),
    },
  })
  return NextResponse.json(powerRankings, { status: 200 })
}
