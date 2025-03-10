'use client'
import Link from 'next/link'
import { redirect, useSearchParams } from 'next/navigation'
import React, { Suspense, useEffect, useState } from 'react'
import { RiParentLine } from 'react-icons/ri'
import { AiOutlineIssuesClose } from 'react-icons/ai'
import { PiHeadCircuitFill } from 'react-icons/pi'
import { FaPenNib } from 'react-icons/fa'
import { PiChalkboardTeacherFill } from 'react-icons/pi'
import { BiSolidBusSchool } from 'react-icons/bi'
import { GrCompliance } from 'react-icons/gr'
import { BsFillMotherboardFill } from 'react-icons/bs'
import Loading from '../../../components/Loading/index'
import AccessibleText from '@/components/AccessibleText/AccessibleText'

type OptionsType = {
  id: number
  title: string
  englishTitle: string
  subtitle: string
  icon: string
  message: Array<string>
}
type Language = 'en' | 'ar'

function OptionsPage() {
  const searchParams = useSearchParams()
  const [options, setOptions] = useState<OptionsType[]>([])
  const [loading, setLoading] = useState(true)
  const lang = searchParams.get('lang') as Language

  const updateInquiry = async (option: OptionsType) => {
    if (option.id !== 3) {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/inquiries/${searchParams.get('inquiryId')}`,
        {
          method: 'PATCH',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            reason: lang === 'ar' ? option.englishTitle : option.title,
          }),
        },
      )
      const results = await response.json()
      if (results.doc.id) {
        redirect(`/checkout?${searchParams}&optionId=${option.id}`)
      }
    }
    redirect(`/checkout?${searchParams}&optionId=${option.id}`)
  }

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${lang === 'en' ? 'optionData.json' : 'optionDataArabic.json'}`)
      const data = await response.json()
      setOptions(data)
      setLoading(false)
    }
    fetchData()
  }, [lang])

  if (loading) {
    return <Loading />
  }
  return (
    <>
      {lang === 'ar' ? (
        <div className="w-11/12">
          <div>
            <div className="flex justify-center">
              <AccessibleText text="كيف تريد أن نوصلك؟" lang="ar-SA" buttonPosition="left">
                <h2 className="text-2xl text-center py-5">كيف تريد أن نوصلك؟</h2>
              </AccessibleText>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {options?.map((option) => (
                <Link
                  href={'/checkout?' + searchParams + '&optionId=' + option?.id}
                  key={option.id}
                  onClick={() => updateInquiry(option)}
                  className="row-span-1 border border-black px-2 py-3 bg-[#ffffff4f]  hover:bg-white rounded-md hover:shadow-md hover:border-blue-600 transition-all hover:-translate-y-1 hover:text-blue-600 hover:cursor-pointer grid grid-cols-3"
                >
                  <span className="col-span-1 flex justify-center items-center">
                    {option?.icon === 'BsFillMotherboardFill' && (
                      <BsFillMotherboardFill className="text-4xl" />
                    )}
                    {option?.icon === 'GrCompliance' && <GrCompliance className="text-4xl" />}
                    {option?.icon === 'BiSolidBusSchool' && (
                      <BiSolidBusSchool className="text-4xl" />
                    )}
                    {option?.icon === 'PiChalkboardTeacherFill' && (
                      <PiChalkboardTeacherFill className="text-4xl" />
                    )}
                    {option?.icon === 'FaPenNib' && <FaPenNib className="text-4xl" />}
                    {option?.icon === 'PiHeadCircuitFill' && (
                      <PiHeadCircuitFill className="text-4xl" />
                    )}
                    {option?.icon === 'AiOutlineIssuesClose' && (
                      <AiOutlineIssuesClose className="text-4xl" />
                    )}
                    {option?.icon === 'RiParentLine' && <RiParentLine className="text-4xl" />}
                  </span>
                  <div className="col-span-2 flex flex-col">
                    <span className="text-lg font-sans">{option?.title}</span>
                    <span className="text-xs text-gray-700">{option?.subtitle}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="w-11/12">
          <div>
            <div className="flex justify-center">
              <AccessibleText text="How would you like us to connect you?">
                <h2 className="text-2xl text-center py-5">How would you like us to connect you?</h2>
              </AccessibleText>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {options?.map((option) => (
                <button
                  // href={'/checkout?' + searchParams + '&optionId=' + option?.id}
                  onClick={() => updateInquiry(option)}
                  key={option.id}
                  className="row-span-1 border border-black px-2 py-3 bg-[#ffffff4f]  hover:bg-white rounded-md hover:shadow-md hover:border-blue-600 transition-all hover:-translate-y-1 hover:text-blue-600 hover:cursor-pointer grid grid-cols-3"
                >
                  <span className="col-span-1 flex justify-center items-center">
                    {option?.icon === 'BsFillMotherboardFill' && (
                      <BsFillMotherboardFill className="text-4xl" />
                    )}
                    {option?.icon === 'GrCompliance' && <GrCompliance className="text-4xl" />}
                    {option?.icon === 'BiSolidBusSchool' && (
                      <BiSolidBusSchool className="text-4xl" />
                    )}
                    {option?.icon === 'PiChalkboardTeacherFill' && (
                      <PiChalkboardTeacherFill className="text-4xl" />
                    )}
                    {option?.icon === 'FaPenNib' && <FaPenNib className="text-4xl" />}
                    {option?.icon === 'PiHeadCircuitFill' && (
                      <PiHeadCircuitFill className="text-4xl" />
                    )}
                    {option?.icon === 'AiOutlineIssuesClose' && (
                      <AiOutlineIssuesClose className="text-4xl" />
                    )}
                    {option?.icon === 'RiParentLine' && <RiParentLine className="text-4xl" />}
                  </span>
                  <div className="col-span-2 flex flex-col">
                    <span className="text-lg font-sans">{option?.title}</span>
                    <span className="text-xs text-gray-700">{option?.subtitle}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default function OptionsPageWithSuspense() {
  return (
    <Suspense fallback={<Loading />}>
      <OptionsPage />
    </Suspense>
  )
}
