import Link from 'next/link'
import { User, Project, SurveyResponse } from '@/types'

interface AdminDashboardProps {
  users: User[]
  projects: Project[]
  surveys: SurveyResponse[]
}

export default function AdminDashboard({ users, projects, surveys }: AdminDashboardProps) {
  const stats = [
    { title: 'Total Users', value: users.length },
    { title: 'Active Projects', value: projects.filter(p => p.status === 'ONGOING').length },
    { title: 'Survey Responses', value: surveys.length },
    { title: 'Completed Projects', value: projects.filter(p => p.status === 'COMPLETED').length }
  ]

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold mb-8">Admin Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat) => (
            <div key={stat.title} className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-gray-500 text-sm mb-2">{stat.title}</h3>
              <p className="text-3xl font-bold">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Recent Users</h2>
            <div className="space-y-4">
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
              <Link href="/admin/users" className="text-blue-600 hover:underline mt-4 block">
                View all users →
              </Link>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Project Status</h2>
            <div className="space-y-4">
              {projects.slice(0, 5).map((project) => (
                <div key={project.id} className="p-3 bg-gray-50 rounded">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium">{project.title}</h3>
                    <span className={`px-2 py-1 text-sm rounded ${
                      project.status === 'ONGOING' ? 'bg-blue-100 text-blue-800' :
                      project.status === 'COMPLETED' ? 'bg-green-100 text-green-800' : 'bg-gray-100'
                    }`}>
                      {project.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">
                    {project?.author?.name} • {project?.startDate?.toLocaleDateString()}
                  </p>
                </div>
              ))}
              <Link href="/admin/projects" className="text-blue-600 hover:underline mt-4 block">
                View all projects →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}