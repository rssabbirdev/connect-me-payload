'use client'
import Loading from '@/components/Loading'
import TimeAgo from '@/components/TimeAgo'
import { Inquiry } from '@/payload-types'
import React, { useEffect, useState } from 'react'

function page() {
  const [inquiries, setInquiries] = useState<Inquiry[]>()
  const [inquiriesLoading, setInquiriesLoading] = useState<Boolean>(true)
  const [updateStatusLoading, setUpdateStatusLoading] = useState<Boolean>(false)

  const updateStatus = (id: string) => {
    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/inquiries/${id}`, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        status: 'Completed',
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setInquiries(inquiries?.filter((i) => i.id !== id))
      })
  }

  useEffect(() => {
    console.log('CLick')
    setInquiriesLoading(true)
    fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/inquiries?where[status][equals]=Pending&sort=-createdAt`,
    )
      .then((res) => res.json())
      .then((data) => {
        setInquiries(data.docs)
        setInquiriesLoading(false)
      })
  }, [])

  return (
    <section className="container">
      <div className="bg-white min-h-[75vh] p-10 text-black rounded-3xl">
        <div className="space-y-4">
          {inquiriesLoading && (
            <div className="flex justify-center items-center">
              <Loading />
            </div>
          )}
          {inquiries?.length === 0 && !inquiriesLoading && (
            <h1 className="text-black text-center">No Notification</h1>
          )}
          {inquiries?.length !== 0 && !inquiriesLoading && (
            <div>
              {inquiries?.map((inquiry) => (
                <details
                  key={inquiry.id}
                  className="group border-s-4 border-green-500 bg-gray-50 p-6 [&_summary::-webkit-details-marker]:hidden"
                >
                  <summary className="flex cursor-pointer items-center justify-between gap-1.5">
                    <h2 className="text-lg font-medium text-gray-900">
                      <span>
                        <TimeAgo createdAt={inquiry.createdAt} status={inquiry.status} />
                      </span>
                      <div>
                        {inquiry.parentName} Request for{' '}
                        <span className="font-bold text-red-800 text-sm">{inquiry.reason}</span>
                      </div>
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
                          {inquiry.studentName.map((s: any) => `${s?.studentName}, `)}
                        </dd>
                      </div>

                      <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                        <dt className="font-medium text-gray-900">Reason To Come</dt>
                        <dd className="text-gray-700 sm:col-span-2">{inquiry.reason}</dd>
                      </div>
                    </dl>
                  </div>
                  <div className="flex justify-end">
                    <button
                      onClick={() => updateStatus(inquiry.id)}
                      className="p-2 mt-5 text-white bg-red-500 rounded-2xl shadow-md hover:bg-red-800"
                    >
                      Completed
                    </button>
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
