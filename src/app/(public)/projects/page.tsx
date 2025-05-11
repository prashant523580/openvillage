// import DonateForm from '@/components/DonateForm'
import prisma from '@/lib/db'
import { Metadata } from 'next'
import Link from 'next/link'
// import { Project } from '@/types'
export const metadata: Metadata = {
  title: "Projects",
  description: 'Rural community development platform',
}
export default async function Projects() {
  const projects = await prisma.project.findMany({
    include: {
      author: true
    },
    orderBy: {
      startDate: 'desc'
    }
  })

  return (
    <div className="py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-8 text-center">Community Projects</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div key={project.id} className="bg-white rounded-lg shadow-md p-4">
              <div className="flex items-center justify-between mb-4">
                <span className={`px-3 py-1 rounded-full text-sm ${
                  project.status === 'ONGOING' ? 'bg-blue-100 text-blue-800' :
                  project.status === 'COMPLETED' ? 'bg-green-100 text-green-800' : 'bg-gray-100'
                }`}>
                  {project.status}
                </span>
                <span className="text-sm text-gray-500">
                  {project.author.name}
                </span>
              </div>
              <h3 className="text-xl font-semibold mb-2 line-clamp-1">{project.title}</h3>
              <p className="text-gray-600 mb-2 line-clamp-1">{project.description}</p>
              <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                <span>
                  {project.startDate.toLocaleDateString()}
                  {project.endDate && ` - ${project.endDate.toLocaleDateString()}`}
                </span>
              </div>
              {project.status !== "COMPLETED" && 
  //  (!project.endDate || new Date(project.endDate) > new Date()) && (
    <Link
      href={`/donation/${project.id}`}
      className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
    >
      Donate 
    </Link>
  // )
  }
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}