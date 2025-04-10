import Footer from '@/components/layout/Footer'
import Navigation from '@/components/layout/Navigation'
import React from 'react'

function PublicLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <Navigation />
            <main className='max-w-6xl mx-auto px-4 py-8'>

            {children}
            </main>
            <Footer/>
        </div>
    )
}

export default PublicLayout