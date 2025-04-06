/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import PhoneInput from 'react-phone-number-input'
import { parsePhoneNumber, isValidPhoneNumber } from 'libphonenumber-js'
import type { CountryCode } from 'libphonenumber-js'

export default function PhoneNumberForm() {
  const { data: session, update } = useSession()
  const [phoneNumber, setPhoneNumber] = useState<string>(session?.user?.phoneNumber || '')
  const [countryCode, setCountryCode] = useState<CountryCode>('NP')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(false), 3000)
      return () => clearTimeout(timer)
    }
  }, [success])

  const validatePhoneNumber = (number: string): boolean => {
    try {
      const phoneNumber = parsePhoneNumber(number, countryCode)
      return phoneNumber.isValid()
    } catch (error) {
      return false
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    
    if (!phoneNumber) {
      setError('Phone number is required')
      return
    }

    if (!isValidPhoneNumber(phoneNumber, countryCode)) {
      setError('Please enter a valid phone number')
      return
    }

    setIsSubmitting(true)

    try {
      
      // Format number before sending to API
      const formattedNumber = parsePhoneNumber(phoneNumber, countryCode).formatInternational()
      
      const response = await fetch('/api/users/update-phone', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phoneNumber: formattedNumber }),
      })

      if (!response.ok) {
        throw new Error('Failed to update phone number')
      }

      await update({ phoneNumber: formattedNumber })
      setSuccess(true)
      setPhoneNumber(formattedNumber)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update phone number')
    } finally {
      setIsSubmitting(false)
    }
  }
  const handlePhoneChange = (value: string | any) => {
    setPhoneNumber(value)
    
    if (value) {
      // Real-time validation as user types
      const isValid = validatePhoneNumber(value)
      if (!isValid) {
        setError('Please enter a valid phone number')
      } else {
        setError(null)
      }
    }
  }
  return (
    <form onSubmit={handleSubmit} className="max-w-md space-y-4">
      <div className="space-y-2">
        {/* <label className="block text-sm font-medium text-gray-700">
          Phone Number
        </label>
        <PhoneInput
          international
          defaultCountry="NP"
          value={phoneNumber}
          onChange={(value) => {
            setPhoneNumber(value || '')
            if (value) {
              try {
                const parsed = parsePhoneNumber(value)
                setCountryCode(parsed.country as CountryCode)
              } catch(error) {
                // Ignore parsing errors
                console.log(error)
              }
            }
          }}
          className={`w-full rounded-md border ${
            error ? 'border-red-500' : 'border-gray-300'
          } px-3 py-2 focus:border-blue-500 focus:ring-blue-500`}
          error={error ? 'Invalid phone number' : undefined}
        /> */}
         <label className="block text-sm font-medium text-gray-700">
          Phone Number
        </label>
        <PhoneInput
          international
          defaultCountry="NP"
          value={phoneNumber}
          onChange={handlePhoneChange} // Use the change handler
          className={`w-full rounded-md border ${
            error ? 'border-red-500' : 'border-gray-300'
          } px-3 py-2 focus:border-blue-500 focus:ring-blue-500`}
        />
        {error && (
          <p className="text-sm text-red-600">{error}</p>
        )}
        
        {success && (
          <p className="text-sm text-green-600">
            Phone number updated successfully!
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting || !phoneNumber}
        className={`w-full rounded-md px-4 py-2 font-medium text-white transition-colors ${
          isSubmitting 
            ? 'cursor-not-allowed bg-blue-400' 
            : 'bg-blue-600 hover:bg-blue-700'
        }`}
      >
        {isSubmitting ? 'Saving...' : 'Save Phone Number'}
      </button>
    </form>
  )
}


// catch (err) {
//   setError(err instanceof Error ? err.message : 'Failed to update phone number')
// } finally {
//   setIsSubmitting(false)
// }