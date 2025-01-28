'use client'
import Loading from '@/components/Loading'
import { Inquiry, Student } from '@/payload-types'
import React, { useEffect, useState } from 'react'

function page() {
  const [inquiries, setInquiries] = useState<Inquiry[]>()
  const [inquiriesLoading, setInquiriesLoading] = useState<Boolean>(true)
  useEffect(() => {
    setInquiriesLoading(true)
    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/inquiries`)
      .then((res) => res.json())
      .then((data) => {
        setInquiries(data.docs)
        setInquiriesLoading(false)
      })
  }, [])
  console.log(inquiries)
  if (inquiriesLoading) {
    return (
      <div>
        <Loading />
      </div>
    )
  }
  return (
    <section className="container">
      <div className="bg-white min-h-80 p-10 text-black rounded-3xl">
        {/* <h1 className="text-lg p-3 font-bold">Notification</h1>
        {inquiries?.length && (
          <div>
            {inquiries?.map((inquiry) => (
              <div key={inquiry.id} className="bg-blue-600 text-white p-3 rounded-3xl">
                {inquiry.parentName} - {inquiry.reason} - {inquiry.status}
              </div>
            ))}
          </div>
        )} */}
        <div className="space-y-4">
          {inquiries?.length && (
            <div>
              {inquiries?.map((inquiry) => (
                <details
                  key={inquiry.id}
                  className="group border-s-4 border-green-500 bg-gray-50 p-6 [&_summary::-webkit-details-marker]:hidden"
                >
                  <summary className="flex cursor-pointer items-center justify-between gap-1.5">
                    <h2 className="text-lg font-medium text-gray-900">
                      {inquiry.parentName} Request for{' '}
                      <span className="font-bold text-red-800 text-sm">{inquiry.reason}</span>
                    </h2>

                    <span className="shrink-0 rounded-full bg-white p-1.5 text-gray-900 sm:p-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="size-5 shrink-0 transition duration-300 group-open:-rotate-45"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </span>
                  </summary>

                  {/* <p className="mt-4 leading-relaxed text-gray-700">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ab hic veritatis
                    molestias culpa in, recusandae laboriosam neque aliquid libero nesciunt
                    voluptate dicta quo officiis explicabo consequuntur distinctio corporis earum
                    similique!
                  </p> */}
                  <div className="flow-root rounded-lg border border-gray-100 py-3 shadow-sm">
                    <dl className="-my-3 divide-y divide-gray-100 text-sm">
                      <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                        <dt className="font-medium text-gray-900">Parent Name</dt>
                        <dd className="text-gray-700 sm:col-span-2">{inquiry.parentName}</dd>
                      </div>

                      <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                        <dt className="font-medium text-gray-900">Parent Mobile Number</dt>
                        <dd className="text-gray-700 sm:col-span-2">Under Develop</dd>
                      </div>

                      <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                        <dt className="font-medium text-gray-900">Students Name</dt>
                        <dd className="text-gray-700 sm:col-span-2">
                          {inquiry.studentName.map((s : (String | Student)) => `${s?.studentName}, `)}
                        </dd>
                      </div>

                      <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                        <dt className="font-medium text-gray-900">Reason To Come</dt>
                        <dd className="text-gray-700 sm:col-span-2">{inquiry.reason}</dd>
                      </div>
                    </dl>
                  </div>
                </details>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default page
