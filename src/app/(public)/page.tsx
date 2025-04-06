import Link from 'next/link'
// import { getServerSession } from 'next-auth'
import {auth } from '@/auth'
import PhoneNumberForm from '@/components/auth/PhoneNumberForm';

export default async function Home() {
  const session = await auth();

  return (
    <div className="min-h-screen">
      <section className="bg-blue-600 text-white py-20">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Welcome to Community Connect</h1>
          <p className="text-xl mb-8">Empowering rural communities through technology</p>
          {!session ? (
            <Link
              href="/login"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-opacity-90 transition"
            >
              Get Started
            </Link>
          ) : (
            <div className="space-y-4">
              <PhoneNumberForm />
              <Link
                href="/dashboard"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-opacity-90 transition"
              >
                Go to Dashboard
              </Link>
            </div>
          )}
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-white rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Community Surveys</h2>
            <p>Share your needs and help prioritize community projects</p>
          </div>
          {/* Add more feature cards */}
        </div>
      </section>
    </div>
  )
}