'use client'
import { Inquiry } from '@/payload-types'
import React, { useEffect, useState } from 'react'

function page() {
  const [inquiries, setInquiries] = useState<Inquiry[]>()
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/inquiries`)
      .then((res) => res.json())
      .then((data) => setInquiries(data.docs))
  }, [])
  console.log(inquiries)
  return (
    <div className="bg-white min-h-80 p-10 text-black rounded-3xl text-center">
      <h1>Notification</h1>
      {inquiries?.length && (
        <div>
          {inquiries?.map((inquiry) => (
            <div key={inquiry.id} className="bg-blue-600 text-white p-3 rounded-3xl">
              {inquiry.parentName} - {inquiry.reason} - {inquiry.status}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default page
