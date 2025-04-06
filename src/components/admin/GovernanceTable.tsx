'use client'

import { deleteGovernancePost } from '@/actions/governance.action'
import { Governance } from '@/types'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function GovernanceTable({ posts }: { posts: Governance[] }) {
  const router = useRouter()

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this post?')) {
      await deleteGovernancePost(id)
      router.refresh()
    }
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left">Title</th>
            <th className="px-6 py-3 text-left">Type</th>
            <th className="px-6 py-3 text-left">Author</th>
            <th className="px-6 py-3 text-left">Date</th>
            <th className="px-6 py-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {posts.map((post) => (
            <tr key={post.id}>
              <td className="px-6 py-4">{post.title}</td>
              <td className="px-6 py-4 capitalize">{post.type}</td>
              <td className="px-6 py-4">{post?.author?.name}</td>
              <td className="px-6 py-4">
                {new Date(post.date).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 space-x-2">
                <Link 
                  href={`/admin/governance/edit/${post.id}`} 
                  className="btn btn-sm"
                >
                  Edit
                </Link>
                <button 
                  onClick={() => handleDelete(post.id)} 
                  className="btn btn-sm btn-error"
                >
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