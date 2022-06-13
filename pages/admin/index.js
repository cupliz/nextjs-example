import React from 'react'
import Link from 'next/link'
import Layout from '../../components/layout'
import Sidebar from '../../components/sidebar'
import api from '../../services/api'
import { friendlyUrl } from '../../utils/helper'

export default function Management() {
  const { data: logos } = api.useGetLogosQuery()
  const { data: listings } = api.useGetListingsQuery()

  return (
    <Layout className="admin-bg">
      <div className="container mx-auto p-5 grid grid-cols-1 md:grid-cols-4 md:gap-5">
        <Sidebar />
        <div className="col-span-3">
          {
            listings?.length ? listings.map((listing, i) => {
              return <div key={i} className='card drop-shadow-lg bg-gray-50 rounded p-4 md:p-5 mt-10 md:mt-0 space-y-5 border border-gray-200'>
                <div className='flex justify-end'>
                  <Link href={`/v/${friendlyUrl(listing.name)}`}><a className='bg-blue-500 px-3 py-1.5 rounded text-white hover:bg-blue-600 whitespace-nowrap'>Public View</a></Link>
                </div>
                <div>
                  <label htmlFor="links">Name:</label>
                  <div>{listing?.name}</div>
                </div>
                <div>
                  <label htmlFor="links">Heading:</label>
                  <div>{listing?.title}</div>
                </div>
                <div>
                  <label htmlFor="links">Links:</label>
                  <div className='flex space-x-5'>
                    {listing?.links && JSON.parse(listing?.links).map((link, j) => {
                      const logo = logos?.find(x => x.key === link.logo)
                      return <div key={j} className="text-center">
                        <div className='w-20 h-20 flex items-center justify-center'>
                          <img className="w-full" src={logo?.url} alt="" />
                        </div>
                        <h1>{logo?.name}</h1>
                      </div>
                    })}
                  </div>
                </div>
                <div>
                  <label htmlFor="background">Background</label>
                  <img src={listing?.background} alt="" />
                </div>
              </div>
            }
            ) : null
          }
        </div>
      </div>
    </Layout>
  )
}