'use client'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { FaCalendarAlt, FaClock } from 'react-icons/fa'
import { IoArrowBackSharp } from 'react-icons/io5'

function Header() {
  const pathname = usePathname()
  const router = useRouter()
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    if (pathname === '/') {
      const timer = setInterval(() => {
        setCurrentTime(new Date())
      }, 1000)

      return () => clearInterval(timer)
    }
  }, [pathname])

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    })
  }

  return (
    <div className="w-full flex justify-between py-2 px-3">
      {/* Date and Time Display */}
      {pathname === '/' ? (
        <div className=" mb-8 flex flex-col  bg-opacity-15 p-3 rounded-2xl">
          <div className="inline-flex items-center space-x-2 text-blue-900 mb-2">
            <FaCalendarAlt />
            <span className="text-lg">{formatDate(currentTime)}</span>
          </div>
          <div className="inline-flex items-center space-x-2 text-blue-900">
            <FaClock />
            <span className="text-2xl font-mono">{formatTime(currentTime)}</span>
          </div>
        </div>
      ) : (
        <div>
          <IoArrowBackSharp
            onClick={() => router.back()}
            className="text-3xl mt-6 ml-4 hover:cursor-pointer hover:-translate-x-1 transition-all duration-500 w-12 h-8 rounded-xl hover:rounded-lg text-center text-white shadow-md  bg-gradient-to-tl from-green-500 via-blue-500 to-indigo-400 bg-size-200 bg-pos-0 hover:bg-pos-100"
          />
        </div>
      )}
      <Link href="/">
        <Image className="" src="/ATS_Logo-Final.png" alt="logo" width={150} height={38} />
      </Link>
    </div>
  )
}

export default Header
