import React from 'react'
import { FaHome } from 'react-icons/fa'
import { MdManageAccounts } from 'react-icons/md'
import { IoNotifications } from 'react-icons/io5'

import Link from 'next/link'

function Footer() {
  return (
    <footer className="w-full bg-[#3b82f6ab] shadow-white shadow-2xl mt-auto backdrop-blur-sm">
      <div className="flex justify-around">
        <Link
          href="/"
          className="text-white text-2xl hover:text-black hover:bg-white transition-all cursor-pointer md:px-20 px-6 py-5"
        >
          <FaHome />
        </Link>
        <Link
          href="/login"
          className="text-white text-2xl hover:text-black hover:bg-white transition-all cursor-pointer md:px-20 px-6 py-5"
        >
          <MdManageAccounts />
        </Link>
        <Link
          href="/notifications"
          className="text-white text-2xl hover:text-black hover:bg-white transition-all cursor-pointer md:px-20 px-6 py-5"
        >
          <IoNotifications />
        </Link>
      </div>
    </footer>
  )
}

export default Footer
