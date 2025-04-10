// import { auth, signIn } from '@/auth'
import OfflineForm from '@/components/OfflineForm'
import { Metadata } from 'next'
// import { redirect } from 'next/navigation';
export const metadata: Metadata = {
  title: "Survey",
  description: 'Rural community development platform',
}
export default async function SurveyPage() {
    // const session = await auth();
    // if (!session?.user ) {
    //    await signIn()
    //   }
  return (
    <div className="py-10 px-4">
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-extrabold text-gray-800 mb-8 text-center ">Community Survey</h1>
      <OfflineForm />
    </div>
    </div>
  )
}