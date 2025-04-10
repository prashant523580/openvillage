import Link from 'next/link'
import React from 'react'

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8">
    <div className="max-w-6xl mx-auto text-center">
      <p>&copy; 2023 Community Connect. All rights reserved.</p>
      <div className="mt-4">
        <Link href="/about" className="text-gray-400 hover:text-white mx-2">About</Link>
        <Link href="/contact" className="text-gray-400 hover:text-white mx-2">Contact</Link>
        {/* <Link href="/privacy" className="text-gray-400 hover:text-white mx-2">Privacy Policy</Link> */}
      </div>
    </div>
  </footer>
  )
}

export default Footer