'use client'
import React, { useEffect, useState } from 'react'

// Define the props interface
interface TimeAgoProps {
  createdAt: string // createdAt is a string in ISO 8601 format
  status: string
}

const TimeAgo: React.FC<TimeAgoProps> = ({ createdAt, status }) => {
  const [timeAgo, setTimeAgo] = useState<string>('')

  useEffect(() => {
    const updateTimeAgo = () => {
      const now = new Date()
      const createdDate = new Date(createdAt)

      // Calculate the difference in various time units
      const diffInSeconds = Math.floor((now.getTime() - createdDate.getTime()) / 1000)
      const diffInMinutes = Math.floor(diffInSeconds / 60)
      const diffInHours = Math.floor(diffInMinutes / 60)
      const diffInDays = Math.floor(diffInHours / 24)
      const diffInWeeks = Math.floor(diffInDays / 7)
      const diffInMonths =
        now.getMonth() -
        createdDate.getMonth() +
        12 * (now.getFullYear() - createdDate.getFullYear())
      const diffInYears = now.getFullYear() - createdDate.getFullYear()

      // Format the output based on the time difference
      let timeAgoString = ''

      if (diffInYears > 0) {
        timeAgoString = `${diffInYears} year${diffInYears !== 1 ? 's' : ''} ago`
      } else if (diffInMonths > 0) {
        timeAgoString = `${diffInMonths} month${diffInMonths !== 1 ? 's' : ''} ago`
      } else if (diffInWeeks > 0) {
        timeAgoString = `${diffInWeeks} week${diffInWeeks !== 1 ? 's' : ''} ago`
      } else if (diffInDays > 0) {
        timeAgoString = `${diffInDays} day${diffInDays !== 1 ? 's' : ''} ago`
      } else if (diffInHours > 0) {
        timeAgoString = `${diffInHours} hour${diffInHours !== 1 ? 's' : ''} ago`
      } else if (diffInMinutes > 0) {
        timeAgoString = `${diffInMinutes} minute${diffInMinutes !== 1 ? 's' : ''} ago`
      } else {
        timeAgoString = `${diffInSeconds} second${diffInSeconds !== 1 ? 's' : ''} ago`
      }

      setTimeAgo(timeAgoString)
    }

    updateTimeAgo() // Calculate time ago once when the component is mounted
  }, [createdAt]) // Run once when `createdAt` changes

  return (
    <span className="text-xs">
      {timeAgo} - {status}
    </span>
  )
}

export default TimeAgo
