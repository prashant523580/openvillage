// app/governance/page.tsx
import { getAllGovernancePosts } from '@/actions/governance.action'

export default async function GovernancePage() {
  const posts = await getAllGovernancePosts()

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Community Governance</h1>
        <div className="space-y-6">
          {posts.map((post) => (
            <div key={post.id} className="card bg-base-100 shadow">
              <div className="card-body">
                <h2 className="card-title">{post.title}</h2>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span>{post.type}</span>
                  <span>{post.author.name}</span>
                  <span>{new Date(post.date).toLocaleDateString()}</span>
                </div>
                <div className="prose max-w-none mt-4">
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
// import prisma from '@/lib/db'

// export default async function GovernancePage() {
//   const governanceItems = await prisma.governance.findMany({
//     include: {
//       author: true
//     },
//     orderBy: {
//       date: 'desc'
//     }
//   })

//   return (
//     <div className="p-6">
//       <div className="max-w-6xl mx-auto">
//         <h1 className="text-2xl font-bold mb-6">Community Governance</h1>
        
//         <div className="space-y-6">
//           {governanceItems.map((item) => (
//             <div key={item.id} className="bg-white rounded-lg shadow-md p-6">
//               <div className="flex items-center justify-between mb-4">
//                 <h3 className="text-xl font-semibold">{item.title}</h3>
//                 <span className="text-sm text-gray-500">
//                   {item.author.name} - {new Date(item.date).toLocaleDateString()}
//                 </span>
//               </div>
//               <div className="prose max-w-none">
//                 {item.content}
//               </div>
//               <div className="mt-4 text-sm text-gray-500">
//                 Category: <span className="capitalize">{item.type}</span>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   )
// }