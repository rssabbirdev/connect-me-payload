'use client'

import { useState } from 'react'
import Link from 'next/link'
import { FaKey } from 'react-icons/fa'
import { useAuth } from '@/providers/Auth'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [error, setError] = useState('')
  const { status, login } = useAuth()
  const router = useRouter()

  if (status === 'loggedIn') {
    return router.push('/admin')
  }

  async function onSubmit(e: React.FormEvent) {
    setError('')
    e.preventDefault()
    setIsLoading(true)
    try {
      await login({ email, password })
      router.push('/admin')
      setIsLoading(false)
    } catch (err) {
      setError('Incorrect Email & Password')
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md rounded-2xl shadow-md p-8 bg-white">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <FaKey className="h-12 w-12 text-black" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Welcome back</h2>
          <p className="text-gray-600 mb-6">Enter your email to sign in to your account</p>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              placeholder="name@example.com"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="flex justify-center">
            <span className="text-sm text-red-500">{error}</span>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-black/90 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        <div className="mt-6 text-center space-y-2">
          <div>
            <Link href="/forgot-password" className="text-sm text-black hover:underline">
              Forgot your password?
            </Link>
          </div>
          <div className="text-sm text-gray-600">
            Don't have an account?{' '}
            <Link href="/registration" className="text-black hover:underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
