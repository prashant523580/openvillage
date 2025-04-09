import GovernanceForm from '@/components/admin/GovernanceForm'
import { getGovernancePostById } from '@/actions/governance.action'

export default async function GovernanceActionPage({
  params,
}: {
  params: Promise<{ action: string; id?: string }>
}) {
    const {action, id} = await params;
  const post = action === 'edit' && id ? 
    await getGovernancePostById(id) : null

  return (
    <div className="p-6  bg-white shadow-md">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 border-b">
          {action === 'new' ? 'Create New' : 'Edit'} Governance Post
        </h1>
        <GovernanceForm initialData={post} />
      </div>
    </div>
  )
}