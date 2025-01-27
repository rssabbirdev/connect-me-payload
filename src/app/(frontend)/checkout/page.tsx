'use client'
import Loading from '@/components/Loading'
import { useSearchParams } from 'next/navigation'
import React, { Suspense, useEffect, useState } from 'react'
import { FaRegSmileBeam } from 'react-icons/fa'

type OptionsType = {
  id: number
  title: string
  subtitle: string
  icon: string
  message: Array<string>
}
type Language = 'en' | 'ar'

function CheckoutPage() {
  const searchParams = useSearchParams()
  //   const [options, setOptions] = useState<OptionsType[]>()
  const [selectedOption, setSelectedOption] = useState<OptionsType>()
  const [loading, setLoading] = useState(true)
  const lang = searchParams.get('lang') as Language
  const [countdown, setCountdown] = useState<number>(10) // Countdown value (10 seconds as an example)
  const [timerId, setTimerId] = useState<number | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${lang === 'en' ? 'optionData.json' : 'optionDataArabic.json'}`)
      const data = (await response.json()) as OptionsType[]
      //   setOptions(data)
      setSelectedOption(data.find((d) => d.id === Number(searchParams.get('optionId'))))
      setLoading(false)
    }
    fetchData()
  }, [lang, searchParams])

  useEffect(() => {
    if (!loading && selectedOption?.id) {
      const id = window.setTimeout(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            window.location.href = '/'
            return 0 // Stop the countdown
          }
          return prev - 1 // Decrement countdown
        })
      }, 1000)

      setTimerId(id) // Store the timer ID

      return () => {
        if (timerId !== null) {
          clearTimeout(timerId) // Clear the previous timeout
        }
      }
    }
  }, [loading, selectedOption?.id, timerId])

  if (loading) {
    return <Loading />
  }
  return (
    <div className="text-center">
      <div>
        <FaRegSmileBeam className="text-center w-full text-[120px] mb-10 text-green-500" />
        <p className="text-lg">
          Mr/Ms: {searchParams.get('parentName')} we received your request about{' '}
          <span className="font-bold">{selectedOption?.title}</span>
        </p>

        {/* <p className='row-span-1 border border-black p-3'>
					{selectedOption?.title}
				</p> */}
      </div>
      <div>
        {selectedOption?.message?.map((message, index) => (
          <p className="text-lg text-blue-700 p-5" key={index}>
            {message}
          </p>
        ))}
      </div>
      <p className="text-xs text-red-500">Redirect to home page within {countdown} second</p>
    </div>
  )
}

export default function CheckoutPageWithSuspense() {
  return (
    <Suspense fallback={<Loading />}>
      <CheckoutPage />
    </Suspense>
  )
}
