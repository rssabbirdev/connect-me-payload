'use client'

import { useState } from 'react'
import Link from 'next/link'
import { FaKey } from 'react-icons/fa'

export default function ResetPasswordPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    otp: '',
    password: '',
    confirmPassword: '',
  })
  const [resetComplete, setResetComplete] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (name === 'otp' && value.length > 6) return
    if (name === 'otp' && !/^\d*$/.test(value)) return

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match")
      return
    }
    if (formData.otp.length !== 6) {
      alert('Please enter the complete verification code')
      return
    }
    setIsLoading(true)
    // Add your password reset logic here
    console.log(formData)
    setResetComplete(true)
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <FaKey className="h-12 w-12 text-black" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Reset your password</h2>
          <p className="text-gray-600 mb-6">Enter the verification code and your new password</p>
        </div>

        {resetComplete ? (
          <div className="text-center space-y-4">
            <p className="text-sm text-gray-600">Your password has been reset successfully!</p>
            <Link
              href="/login"
              className="block w-full bg-black text-white py-2 px-4 rounded-md hover:bg-black/90 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 transition-colors"
            >
              Continue to login
            </Link>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-1">
                Verification Code
              </label>
              <div className="flex justify-center">
                <input
                  id="otp"
                  name="otp"
                  type="text"
                  inputMode="numeric"
                  value={formData.otp}
                  onChange={handleChange}
                  className="w-48 text-center tracking-[1em] px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-xl"
                  placeholder="······"
                  maxLength={6}
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                New Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                placeholder="Enter your new password"
                required
              />
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Confirm New Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                placeholder="Confirm your new password"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-black/90 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? 'Resetting password...' : 'Reset password'}
            </button>
          </form>
        )}

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Remember your password?{' '}
            <Link href="/login" className="text-black hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
