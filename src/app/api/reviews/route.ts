import { Reviews } from '@prisma/client'
import { db as prisma } from '@/lib/db'
import { NextResponse } from 'next/server'

export const GET = async () => {
  const reviews: Reviews[] = await prisma.reviews.findMany()

  return NextResponse.json(reviews, { status: 200 })
}
