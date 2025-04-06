/* eslint-disable @typescript-eslint/no-explicit-any */

import { auth } from '@/auth';
import { SessionProvider } from 'next-auth/react';
import React from 'react'
async function AuthSessionProvider({children} :any) {
  const session = await auth();
  return (
        <SessionProvider session={session}>
            {children}
        </SessionProvider>
  )
}


export default AuthSessionProvider