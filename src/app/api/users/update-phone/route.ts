// import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
import prisma from '@/lib/db'
import { auth } from '@/auth'

export async function POST(req: Request) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { phoneNumber } = await req.json()

  const user = await prisma.user.update({
    where: { id: session.user?.id },
    data: { phoneNumber },
  })

  return NextResponse.json(user)
}