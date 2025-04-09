import { getAllGovernancePosts } from '@/actions/governance.action'
import { LinkButton } from '@/components/admin/Elements'
import GovernanceTable from '@/components/admin/GovernanceTable'


export default async function AdminGovernancePage() {
  const posts = await getAllGovernancePosts()

  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Manage Governance Posts</h1>
          <LinkButton
          href="/admin/governance/new"
          title='Create New Post'
          />
         
        </div>
        <GovernanceTable posts={posts} />
      </div>
    </div>
  )
}