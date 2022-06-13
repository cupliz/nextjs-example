import React, { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import Layout from '../../components/layout'
import Sidebar from '../../components/sidebar'
import api from '../../services/api'
import { friendlyUrl } from '../../utils/helper'
import { useAuth } from '../../utils/hooks'
import { IoEyeOutline } from 'react-icons/io5'
import { HiOutlinePencil, HiOutlineSave, HiPlus } from 'react-icons/hi'

export default function Management() {
  const { authCheck, user } = useAuth()
  const [editId, setEditId] = useState('')
  const { data: logos } = api.useGetLogosQuery()
  const params = useMemo(() => new URLSearchParams({ user: user?.uid }).toString(), [user])
  const { data: listings } = api.useGetListingsQuery(`?${params}`)
  const editListing = (value) => {
    if (editId === value.id) {
      setEditId('')
    } else {
      setEditId(value.id)
    }
  }
  useEffect(() => {
    authCheck()
  }, []);
  return (
    <Layout className="admin-bg">
      <div className="container mx-auto p-5 grid grid-cols-1 md:grid-cols-4 md:gap-5">
        <Sidebar />
        <div className="col-span-3">
          {/* <div className='flex justify-end mb-4'>
            <a className='bg-green-500 px-3 py-1.5 rounded text-white hover:bg-green-600 flex items-center cursor-pointer' onClick={() => editListing(listing)}>
              <HiPlus className='mr-2' /> Add
            </a>
          </div> */}
          {
            listings?.length ? listings.map((listing, i) => {
              const isEdit = editId == listing.id
              return <form key={i} className='card drop-shadow-lg bg-gray-50 rounded p-4 md:p-5 mt-10 md:mt-0 space-y-5 border border-gray-200'>
                <div className='flex justify-between'>
                  <Link href={`/v/${friendlyUrl(listing.name)}`}>
                    <a target="_blank" className='bg-blue-500 px-3 py-1.5 rounded text-white hover:bg-blue-600 flex items-center'>
                      <IoEyeOutline className='mr-2' /> Public View
                    </a>
                  </Link>
                  {editId ?
                    <a className='bg-rose-500 px-3 py-1.5 rounded text-white hover:bg-rose-600 flex items-center cursor-pointer' onClick={() => editListing(listing)}>
                      <HiOutlineSave className='mr-2' /> Save
                    </a>
                    : <a className='bg-green-500 px-3 py-1.5 rounded text-white hover:bg-green-600 flex items-center cursor-pointer' onClick={() => editListing(listing)}>
                      <HiOutlinePencil className='mr-2' /> Edit
                    </a>
                  }
                </div>
                <div>
                  <label htmlFor="links">Name:</label>
                  <div>{isEdit ? <input type="text" className="bg-gray-100 border-0 rounded w-full" placeholder="Listing name" defaultValue={listing?.name} /> : listing?.name}</div>
                </div>
                <div>
                  <label htmlFor="links">Heading:</label>
                  <div>{isEdit ? <input type="text" className="bg-gray-100 border-0 rounded w-full" placeholder="Page heading" defaultValue={listing?.title} /> : listing?.title}</div>
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
              </form>
            }
            ) : <div className='card drop-shadow-lg bg-gray-50 rounded p-4 md:p-5 mt-10 md:mt-0 space-y-5 border border-gray-200 h-96 flex items-center justify-center'>
              No listings available
            </div>
          }
        </div>
      </div>
    </Layout>
  )
}