// import { getServerSession } from 'next-auth'
// import { auth } from '@/auth'
import prisma from '@/lib/db'
// import { redirect } from 'next/navigation'
import AdminDashboard from '@/components/admin/Dashboard'

export default async function AdminPage() {


  const [users, projects, surveys] = await Promise.all([
    prisma.user.findMany({
      include: {
        surveys: true,
        projects: true
      }
    }),
    prisma.project.findMany({
      include: {
        author: true
      }
    }),
    prisma.surveyResponse.findMany({
      include: {
        user: true
      }
    })
  ])

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminDashboard 
        users={users} 
        projects={projects} 
        surveys={surveys} 
      />
    </div>
  )
}