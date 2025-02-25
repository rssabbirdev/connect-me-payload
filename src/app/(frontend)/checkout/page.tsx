'use client'
import AccessibleText from '@/components/AccessibleText/AccessibleText'
import Loading from '@/components/Loading'
import { redirect, useSearchParams } from 'next/navigation'
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
  const [consuler, setConsuler] = useState<string[]>([
    'Ms. Fatmah Al Yammhi',
    'Ms. Fatima Almazrouee',
    'Ms. Fatima Alghfeli',
    'Ms. Amira Aljasmi',
  ])
  console.log(selectedOption)
  const updateInquiry = async (consulerName: string, option: OptionsType) => {
    setLoading(true)
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/inquiries/${searchParams.get('inquiryId')}`,
      {
        method: 'PATCH',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          reason: `Meeting with consuler ${consulerName}`,
        }),
      },
    )
    const results = await response.json()
    if (results?.doc?.id) {
      redirect(`/checkout?${searchParams}&meet=done`)
    }
    setLoading(false)
  }

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
    if (selectedOption?.id !== 3 || searchParams.get('meet') === 'done') {
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
  }, [countdown])

  if (loading) {
    return <Loading />
  }
  return (
    <div className="text-center bg-[#ffffffb8] p-5 rounded-3xl min-h-96">
      {selectedOption?.id === 3 && searchParams.get('meet') !== 'done' ? (
        <div>
          {lang === 'ar' ? (
            <div className="flex justify-center">
              <AccessibleText
                text="يرجى اختيار القنصل الذي ستقابله."
                lang="ar-SA"
                buttonPosition="left"
              >
                <h2 className="text-xl font-bold">يرجى اختيار القنصل الذي ستقابله.</h2>
              </AccessibleText>
            </div>
          ) : (
            <div className="flex justify-center">
              <AccessibleText text="Please choose the consular you have meeting with.">
                <h2 className="text-xl font-bold">
                  Please choose the consular you have meeting with.
                </h2>
              </AccessibleText>
            </div>
          )}
          <div className="grid grid-cols-2 gap-5 mt-10">
            {consuler.map((c, index) => (
              <button
                onClick={() => updateInquiry(c, selectedOption)}
                className="col-span-1 border border-black px-3 py-3 hover:bg-black hover:text-white transition-all"
                key={index}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="">
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
      )}
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
