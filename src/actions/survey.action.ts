'use server'

import prisma from '@/lib/db'
import { SurveyResponse } from '@/types'

export async function createSurveyResponse(data: Omit<SurveyResponse, 'id' | 'createdAt'>) {
  return await prisma.surveyResponse.create({
    data: {
      name: data.name,
      needs: data.needs,
      challenges: data.challenges,
      userId: data.userId
    }
  })
}