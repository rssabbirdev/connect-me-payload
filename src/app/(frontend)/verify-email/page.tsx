'use client'

import { useState } from 'react'
import Link from 'next/link'
import { FaEnvelope } from 'react-icons/fa'
import { useSearchParams } from 'next/navigation'

export default function VerifyEmailPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [otp, setOtp] = useState('')
  const [verified, setVerified] = useState(false)
  const [error, setError] = useState('')
  const searchParams = useSearchParams()

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (otp.length !== 6) return
    setIsLoading(true)
    setError('')
    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/verify-email`, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: searchParams.get('id'),
        _otp: otp,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setError(data.message)
        setVerified(data.status)
        setIsLoading(false)
      })
      .catch((err) => {
        setVerified(false)
        setIsLoading(false)
      })
  }

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (value.length > 6) return
    if (!/^\d*$/.test(value)) return
    setOtp(value)
  }

  const handleResendCode = () => {
    // Add your resend code logic here
    console.log('Resend code')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        {verified ? (
          <div className="text-center space-y-4">
            <p className="text-sm text-gray-600">Your email has been verified successfully!</p>
            <Link
              href="/login"
              className="block w-full bg-black text-white py-2 px-4 rounded-md hover:bg-black/90 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 transition-colors"
            >
              Continue to login
            </Link>
          </div>
        ) : (
          <>
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <FaEnvelope className="h-12 w-12 text-black" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Verify your email</h2>
              <p className="text-gray-600 mb-6">Enter the verification code sent to your email</p>
            </div>
            <form onSubmit={onSubmit} className="space-y-4">
              <div className="flex justify-center">
                <input
                  type="text"
                  inputMode="numeric"
                  value={otp}
                  onChange={handleOtpChange}
                  className="w-48 text-center tracking-[1em] px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-xl"
                  placeholder="······"
                  maxLength={6}
                  required
                />
              </div>
              <div className="flex justify-center">
                {error && <span className="text-red-500">{error}</span>}
              </div>

              <button
                type="submit"
                disabled={isLoading || otp.length !== 6}
                className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-black/90 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isLoading ? 'Verifying...' : 'Verify email'}
              </button>
            </form>
            <div className="mt-6 text-center">
              <button onClick={handleResendCode} className="text-sm text-black hover:underline">
                Didn't receive the code? Resend
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
