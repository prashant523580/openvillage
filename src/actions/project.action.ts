"use server"
import { auth } from "@/auth";
import prisma from "@/lib/db";
import { Project, ProjectStatus } from "@/types";
import { revalidatePath } from "next/cache";

export async function createProject(
  data: Omit<Project, "id" | "createdAt">
) {
  return await prisma.project.create({
    data: {
      title: data.title,
      description: data.description,
      status: data.status as ProjectStatus,
      startDate: data.startDate as string | Date,
      endDate: data.endDate,
      impact: data.impact,
      opportunities: data.opportunities as  string,
      createdBy: data.createdBy as string,
    },
  });
}
export async function updateProject( data: Omit<Project,   "createdAt">) {
    const session = await auth()
    if (session?.user?.role !== 'ADMIN') throw new Error('Unauthorized')
  
    return await prisma.project.update({
      where: { id : data.id },
      data: {
        title: data.title,
        description: data.description,
        status: data.status,
        startDate: data.startDate,
        endDate: data.endDate,
        impact: data.impact,
        opportunities: data.opportunities
      }
    })
  }
  
  export async function deleteProject(id: string) {
    const session = await auth()
    if (session?.user?.role !== 'ADMIN') throw new Error('Unauthorized')
  
    await prisma.project.delete({ where: { id } })
    revalidatePath('/admin/projects')
  }
  
  export async function getAllProjects() {
    return await prisma.project.findMany({
      include: { author: true },
      orderBy: { createdAt: 'desc' }
    })
  }
  
  export async function getProjectById(id: string) {
    return await prisma.project.findUnique({
      where: { id },
      include: { author: true }
    })
  }