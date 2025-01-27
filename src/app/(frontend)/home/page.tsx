'use client'
import Image from 'next/image'
import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="flex justify-center flex-col items-center w-full gap-14">
      <div className="flex justify-center items-center flex-col">
        <Image src="/logo.png" alt="logo" width={100} height={38} />
        <h2 className="text-2xl font-bold">CONNECT ME</h2>
        <p className="tracking-widest">Parent Visits Simplified</p>
      </div>
      <div className="flex flex-col gap-5 w-2/4">
        <Link
          className="rounded-2xl hover:rounded-lg px-10 py-3 text-center text-white shadow-md transition-all duration-500 bg-gradient-to-tl from-green-500 via-blue-500 to-indigo-400 bg-size-200 bg-pos-0 hover:bg-pos-100 hover:-translate-y-1"
          href={'/checking/en'}
        >
          English
        </Link>
        <Link
          className="rounded-2xl hover:rounded-lg px-10 py-3 text-center text-white shadow-md transition-all duration-500 bg-gradient-to-tl from-green-500 via-blue-500 to-indigo-400 bg-size-200 bg-pos-0 hover:bg-pos-100 hover:-translate-y-1"
          href={'/checking/ar'}
        >
          Arabic
        </Link>
      </div>
    </div>
  )
}
