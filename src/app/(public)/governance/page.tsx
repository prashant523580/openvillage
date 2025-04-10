// app/governance/page.tsx
import { getAllGovernancePosts } from '@/actions/governance.action'
import { Metadata } from 'next'
export const metadata: Metadata = {
  title: "Governance",
  description: 'Rural community development platform',
}
export default async function GovernancePage() {
  const posts = await getAllGovernancePosts()

  return (
    <div className="  py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-8 text-center">
          Community Governance
        </h1>
        <div className="space-y-8">
          {posts.map((post) => (
            <div key={post.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-800">{post.title}</h2>
                <div className="mt-2 flex items-center gap-4 text-sm text-gray-500">
                  <span className="font-medium">{post.type}</span>
                  <span className="font-medium">{post.author.name}</span>
                  <span>{new Date(post.date).toLocaleDateString()}</span>
                </div>
                <div className="mt-4 prose prose-indigo max-w-none">
                  {post.content}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
