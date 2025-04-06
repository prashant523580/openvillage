// import { auth, signIn } from '@/auth'
import OfflineForm from '@/components/OfflineForm'
// import { redirect } from 'next/navigation';

export default async function SurveyPage() {
    // const session = await auth();
    // if (!session?.user ) {
    //    await signIn()
    //   }
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Community Survey</h1>
      <OfflineForm />
    </div>
  )
}