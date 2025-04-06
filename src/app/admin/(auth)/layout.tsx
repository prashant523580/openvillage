import { auth } from '@/auth';
import AdminLayout from '@/components/admin/Layout';
// import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react'

async function AdminDashboardLayout({children}:{children: React.ReactNode}) {
    const session = await auth();
  
    if (!session?.user || session.user.role !== 'ADMIN') {
    // if (!session?.user) {
      redirect('/')
    }
  return (
  <AdminLayout>
    {children}
  </AdminLayout>
  )
}

export default AdminDashboardLayout