import { getAllGovernancePosts } from '@/actions/governance.action'
import GovernanceTable from '@/components/admin/GovernanceTable'
import Link from 'next/link'

export default async function AdminGovernancePage() {
  const posts = await getAllGovernancePosts()

  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Manage Governance Posts</h1>
          <Link href="/admin/governance/new" className="btn btn-primary">
            Create New Post
          </Link>
        </div>
        <GovernanceTable posts={posts} />
      </div>
    </div>
  )
}