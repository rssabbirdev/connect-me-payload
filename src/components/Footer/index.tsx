import React from 'react'
import { FaHome } from 'react-icons/fa'
import { MdManageAccounts } from 'react-icons/md'
import { IoNotifications } from 'react-icons/io5'

import Link from 'next/link'

function Footer() {
  return (
    <div className="w-full py-4 bg-[#3b82f6ab] shadow-white shadow-2xl absolute bottom-0 backdrop-blur-sm">
      <div className="flex justify-around">
        <Link href="/" className="text-white text-2xl">
          <FaHome />
        </Link>
        <Link href="/admin" className="text-white text-2xl">
          <MdManageAccounts />
        </Link>
        <Link href="/notifications" className="text-white text-2xl">
          <IoNotifications />
        </Link>
      </div>
    </div>
  )
}

export default Footer
