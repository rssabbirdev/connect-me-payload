import React from 'react'
import { FaHome } from 'react-icons/fa'
import { IoMdSettings } from 'react-icons/io'
import { GoKebabHorizontal } from 'react-icons/go'
import Link from 'next/link'

function Footer() {
  return (
    <div className="w-full py-4 bg-[#3b82f6ab] shadow-white shadow-2xl absolute bottom-0 backdrop-blur-sm">
      <div className="flex justify-around">
        <Link href="/" className="text-white text-2xl">
          <FaHome />
        </Link>
        <button className="text-white text-2xl">
          <IoMdSettings />
        </button>
        <button className="text-white text-2xl">
          <GoKebabHorizontal />
        </button>
      </div>
    </div>
  )
}

export default Footer
