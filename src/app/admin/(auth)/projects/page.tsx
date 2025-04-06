import { getAllProjects } from '@/actions/project.action'
import ProjectTable from '@/components/admin/ProjectTable'
import Link from 'next/link'

export default async function AdminProjectsPage() {
  const projects = await getAllProjects()

  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Manage Projects</h1>
          <Link href="/admin/projects/new" className="btn btn-primary">
            Create New Project
          </Link>
        </div>
        <ProjectTable projects={projects} />
      </div>
    </div>
  )
}