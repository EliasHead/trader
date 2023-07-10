import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import type { Competition } from '@prisma/client'
const prisma = new PrismaClient()

export const PATCH = async (
  request: Request,
  { params }: { params: { id: string } },
) => {
  const body: Competition = await request.json()
  const competition = await prisma.competition.update({
    where: {
      competition_id: Number(params.id),
    },
    data: {
      competition_name: body.competition_name,
      season_name: body.season_name,
    },
  })
  return NextResponse.json(competition, { status: 200 })
}

export const DELETE = async (
  request: Request,
  { params }: { params: { id: string } },
) => {
  const competition = await prisma.competition.delete({
    where: {
      competition_id: Number(params.id),
    },
  })
  return NextResponse.json(competition, { status: 200 })
}
