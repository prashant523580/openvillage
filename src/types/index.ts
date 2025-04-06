export enum Role {
  USER = "USER",
  ADMIN = "ADMIN",
}

export enum ProjectStatus {
  ONGOING = "ONGOING",
  COMPLETED = "COMPLETED",
  PLANNED = "PLANNED",
}
export type User = {
  id: string
  name?: string | null
  email?: string | null
  phoneNumber?: string | null
  role: 'ADMIN' | 'USER'
  createdAt: Date
  updatedAt: Date
}

export type Project = {
  id: string
  title: string
  description: string
  status: 'ONGOING' | 'COMPLETED' | 'PLANNED'
  startDate?: Date
  endDate?: Date | null
  impact: string
  opportunities?: string
  createdBy?: string
  author?: User
}

export type SurveyResponse = {
  id: string
  name: string
  needs: string
  challenges: string
  userId: string
  user?: User
  createdAt: Date
}

export type Governance = {
  id: string
  title: string
  content: string
  type: string
  date: Date
  authorId: string
  author?: User
}