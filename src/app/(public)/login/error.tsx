'use client' // Error components must be Client Components
 
import { useEffect } from 'react'
import { IoReload } from 'react-icons/io5'
 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])
 
  return (
    <div className='text-center p-8 font-bold text-red-500'>
      <h2>Error:{error.message}</h2>
      <button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
        className='text-black'
      >
        <IoReload/>
      </button>
    </div>
  )
}