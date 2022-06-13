import Link from 'next/link'
import React from 'react'
import Footer from './footer'

export default function Layout({ children, className }) {
  return (
    <main className={`h-screen flex flex-col justify-between ${className}`}>
      <section className='stars-bg'>
        <header className="text-white container mx-auto p-5 text-2xl font-bold">
          <Link href="/"><a className="font-bold">STRBookingPortal</a></Link>
        </header>
        {children}
      </section>
      <Footer />
    </main>
  )
}
