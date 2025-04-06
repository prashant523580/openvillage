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
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-6">Community Survey Form</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Survey Name</label>
          <input
            type="text"
            required
            className="w-full p-2 border rounded-md"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Community Needs</label>
          <textarea
            required
            className="w-full p-2 border rounded-md h-32"
            value={formData.needs}
            onChange={(e) => setFormData({ ...formData, needs: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Challenges Faced</label>
          <textarea
            required
            className="w-full p-2 border rounded-md h-32"
            value={formData.challenges}
            onChange={(e) => setFormData({ ...formData, challenges: e.target.value })}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
        >
          {isOnline ? 'Submit Survey' : 'Save Locally'}
        </button>
      </div>
    </form>
  )
}