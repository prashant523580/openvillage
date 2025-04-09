import { getAllProjects } from '@/actions/project.action'
import { LinkButton } from '@/components/admin/Elements'
import ProjectTable from '@/components/admin/ProjectTable'


export default async function AdminProjectsPage() {
  const projects = await getAllProjects()

  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Manage Projects</h1>
          <LinkButton href="/admin/projects/new"
          title='Create New Project'
          />
        </div>
        <ProjectTable projects={projects} />
      </div>
    </div>
  )
}