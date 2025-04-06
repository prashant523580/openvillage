import React from 'react'
import { redirect } from 'next/navigation';
// import Loading from '@/components/Loading';
import { auth } from '@/auth';
import Login from './LoginComponent';

async function Loginpage() {
  const session = await auth();
  if (session?.user) {
    redirect("/")
  }
  return (
    <Login/>
  )
}

export default Loginpage