import ProjectForm from '@/components/admin/ProjectForm'
import { getProjectById } from '@/actions/project.action'
// import ProjectForm from '@/components/ProjectForm';

export default async function ProjectActionPage({
  params,
}: {
  params: Promise<{ action: string; id?: string }>
}) {
  const {action, id} = await params;
  const project = action === 'edit' && id ? await getProjectById(id) : null

  return (
    <div className="p-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">
          {action === 'new' ? 'Create New' : 'Edit'} Project
        </h1>
        <ProjectForm initialData={project} />
      </div>
    </div>
  )
}