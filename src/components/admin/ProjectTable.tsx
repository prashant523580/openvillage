'use client'

import { deleteProject } from '@/actions/project.action'
import { Project } from '@/types'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function ProjectTable({ projects }: { projects: Project[] }) {
  const router = useRouter()

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      await deleteProject(id)
      router.refresh()
    }
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left">Title</th>
            <th className="px-6 py-3 text-left">Status</th>
            <th className="px-6 py-3 text-left">Author</th>
            <th className="px-6 py-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {projects.map((project) => (
            <tr key={project.id}>
              <td className="px-6 py-4">{project.title}</td>
              <td className="px-6 py-4">
                <span className="badge badge-info">{project.status}</span>
              </td>
              <td className="px-6 py-4">{project?.author?.name}</td>
              <td className="px-6 py-4 space-x-2">
                <Link href={`/admin/projects/edit/${project.id}`} className="btn btn-sm">
                  Edit
                </Link>
                <button onClick={() => handleDelete(project.id)} className="btn btn-sm btn-error">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}