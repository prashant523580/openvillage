import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
// import Link from 'next/link'
import AuthSessionProvider from '@/Providers/AuthSessionProvider'

// import Navigation from '@/components/layout/Navigation'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'openVillage',
  description: 'Rural community development platform',
}

export default  function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
      
<AuthSessionProvider>

        {/* <nav className="bg-white shadow">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex justify-between items-center h-16">
              <Link href="/" className="text-lg font-semibold">Community Platform</Link>
              <div className="hidden md:flex space-x-4">
                <Link href="/survey" className="px-3 py-2 rounded hover:bg-gray-100">Survey</Link>
                <Link href="/dashboard" className="px-3 py-2 rounded hover:bg-gray-100">Projects</Link>
                <Link href="/governance" className="px-3 py-2 rounded hover:bg-gray-100">Governance</Link>
                </div>
                </div>
                </div>
                </nav> */}
     
        {children}
                </AuthSessionProvider>
      </body>
    </html>
  )
}