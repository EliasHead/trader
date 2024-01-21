import { Results } from '@prisma/client'
import { db as prisma } from '@/lib/db'
import { NextResponse } from 'next/server'

export const GET = async () => {
  const results: Results[] = await prisma.results.findMany()

  return NextResponse.json(results, { status: 200 })
}
