"use server";

import prisma from "@/lib/db";
import { Governance } from "@/types";
import { revalidatePath } from 'next/cache'
import { auth } from '../auth'

export async function createGovernance(
  data: Omit<Governance, "id" | "date">
) {
  return await prisma.governance.create({
    data: {
      title: data.title,
      content: data.content,
      type: data.type,
      authorId: data.authorId,
    },
  });
}



export async function createGovernancePost(data: {
  title: string
  content: string
  type: string
  userId: string
}) {
  return await prisma.governance.create({
    data: {
      title: data.title,
      content: data.content,
      type: data.type,
      authorId: data.userId
    }
  })
}

export async function updateGovernancePost(id: string, data: {
  title: string
  content: string
  type: string
}) {
  const session = await auth()
  if (session?.user?.role !== 'ADMIN') throw new Error('Unauthorized')

  return await prisma.governance.update({
    where: { id },
    data: {
      title: data.title,
      content: data.content,
      type: data.type
    }
  })
}

export async function deleteGovernancePost(id: string) {
  const session = await auth()
  if (session?.user?.role !== 'ADMIN') throw new Error('Unauthorized')

  await prisma.governance.delete({ where: { id } })
  revalidatePath('/admin/governance')
}

export async function getAllGovernancePosts() {
  return await prisma.governance.findMany({
    include: { author: true },
    orderBy: { date: 'desc' }
  })
}

export async function getGovernancePostById(id: string) {
  return await prisma.governance.findUnique({
    where: { id },
    include: { author: true }
  })
}