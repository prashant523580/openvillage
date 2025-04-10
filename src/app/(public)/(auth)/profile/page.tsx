import { auth } from '@/auth'
import ProfileForm from '@/components/ProfileForm';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import React from 'react'
export const metadata: Metadata = {
    title: "Profile",
    description: 'Rural community development platform',
  }
async function ProfilePage() {
const session = await auth();
if(!session){
    redirect("/")
}
  return (
    <div>
        {/* <h2>Profile</h2> */}
        <ProfileForm />
    </div>
  )
}

export default ProfilePage