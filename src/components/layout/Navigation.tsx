'use client'

import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navigation() {
  const { data: session } = useSession()
  const pathname = usePathname()

  const navLinks = [
    { href: '/dashboard', label: 'Projects' },
    { href: '/survey', label: 'Survey' },
    { href: '/governance', label: 'Governance' },
    ...(session?.user.role === 'ADMIN' ? [{ href: '/admin/dashboard', label: 'Admin' }] : [])
  ]

  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-gray-900">
              CommunityConnect
            </Link>
            <div className="hidden md:ml-6 md:flex md:space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                    pathname === link.href
                      ? 'border-blue-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center">
            {session ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-500 hidden md:block">
                  {session.user.name}
                </span>
                <Link
                  href="/api/auth/signout"
                  className="text-gray-500 hover:text-gray-700 text-sm font-medium"
                >
                  Sign out
                </Link>
              </div>
            ) : (
              <Link
                // href="/api/auth/signin"
                 href="/api/auth/signin"
                className="text-gray-500 hover:text-gray-700 text-sm font-medium"
              >
                Sign in
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}