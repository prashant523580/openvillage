// import { getServerSession } from 'next-auth'
// import { auth } from '@/auth'
import prisma from '@/lib/db'
// import { redirect } from 'next/navigation'

export default async function UserPage() {


  const [users] = await Promise.all([
    prisma.user.findMany({
      include: {
        surveys: true,
        projects: true
      }
    })

  ])

  return (
    <div className="min-h-screen bg-gray-50">
       {users.slice(0, 5).map((user) => (
                <div key={user.id} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                  <div>
                    <p className="font-medium">{user.name}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                  <span className={`px-2 py-1 text-sm rounded ${
                    user.role === 'ADMIN' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                  }`}>
                    {user.role}
                  </span>
                </div>
              ))}
    </div>
  )
}