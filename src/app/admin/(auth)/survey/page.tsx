// import { getServerSession } from 'next-auth'
// import { auth } from '@/auth'
import prisma from '@/lib/db'
// import { redirect } from 'next/navigation'

export default async function SurveyPage() {


  const [surveys] = await Promise.all([
    prisma.surveyResponse.findMany({
      include: {
        // surveys: true,
        // projects: true,
        user: true
      }
    })

  ])

  return (
    <div className="py-8 ">
<h2 className='text-center text-3xl uppercase mb-5'>Survey</h2>
      <div className="space-y-2">

       {surveys.slice(0, 5).map((survey) => (
         <div key={survey.id} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                  <div>
                    <p className="font-medium">{survey.name}</p>
                    <p className="text-sm text-gray-500">{survey.challenges}</p>
                    <p className="text-sm text-gray-500">{survey.needs}</p>
                    <p className="text-sm text-gray-500">{survey.createdAt.toLocaleDateString()}</p>
                    <p className="text-sm text-gray-500 uppercase">{survey.user.name}</p>
                  </div>
                 
                </div>
              ))}
                  </div>
    </div>
  )
}