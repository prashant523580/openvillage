'use client'

import { useSession } from 'next-auth/react'
import { useState, useEffect } from 'react'
import { createSurveyResponse } from '@/actions/survey.action'

export default function SurveyForm() {
  const { data: session } = useSession()
  const [formData, setFormData] = useState({
    name: '',
    needs: '',
    challenges: ''
  })
  const [isOnline, setIsOnline] = useState(true)

  // Handle online/offline state
  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)
    
    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)
    
    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!session?.user) {
      alert('Please sign in to submit the survey')
      return
    }

    const submission = {
      ...formData,
      userId: session.user.id
    }

    if (!isOnline) {
      const pending = JSON.parse(localStorage.getItem('pendingSurveys') || '[]')
      pending.push(submission)
      localStorage.setItem('pendingSurveys', JSON.stringify(pending))
      alert('Survey saved locally. Will submit when online.')
      setFormData({ name: '', needs: '', challenges: '' })
      return
    }

    try {
      await createSurveyResponse(submission)
      setFormData({ name: '', needs: '', challenges: '' })
      alert('Survey submitted successfully!')
    } catch (error) {
      console.error('Submission error:', error)
      alert('Error submitting survey')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="  p-8 bg-white rounded-xl shadow-lg">
      {/* <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6 text-center">Community Survey Form</h2> */}
      <div className="space-y-6">
        
        {/* Name Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Survey Name</label>
          <input
            type="text"
            required
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>
        
        {/* Needs Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Community Needs</label>
          <textarea
            required
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition h-28 resize-none"
            value={formData.needs}
            onChange={(e) => setFormData({ ...formData, needs: e.target.value })}
          ></textarea>
        </div>
        
        {/* Challenges Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Challenges Faced</label>
          <textarea
            required
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition h-28 resize-none"
            value={formData.challenges}
            onChange={(e) => setFormData({ ...formData, challenges: e.target.value })}
          ></textarea>
        </div>
        
        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 transition-colors"
        >
          {isOnline ? 'Submit Survey' : 'Save Locally'}
        </button>
      </div>
    </form>
  )
}
