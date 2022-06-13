import React from 'react'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-slate-700 w-full z-40">
      <div className="md:h-14 container mx-auto text-white p-5 md:flex items-center justify-between">
        <Link href="/"><a className="font-bold">STRBookingPortal</a></Link>
        <div className='px-2'>
          <Link href="/"><a className="px-2">Copyright STR Booking Portal @2022</a></Link>
          |<Link href="/"><a className="underline px-2">Privacy Policy</a></Link>
          |<Link href="/"><a className="underline px-2">Term of Services</a></Link>
          |<Link href="/admin"><a className="underline px-2">Admin</a></Link>
        </div>
      </div>
    </footer>
  )
}
