import React, { useEffect, useMemo, useState } from 'react'
import { HiOutlineEye, HiOutlinePencil, HiOutlineSave, HiTrash } from 'react-icons/hi'
import Link from 'next/link'
import Layout from '../../components/layout'
import Sidebar from '../../components/sidebar'
import ListingForm from '../../components/admin/listingForm'
import api from '../../services/api'
import { friendlyUrl } from '../../utils/helper'
import { useAuth } from '../../utils/hooks'

export default function Management() {
  const { authCheck, user } = useAuth()
  const [show, setShow] = useState(false)
  const [editId, setEditId] = useState(null)
  const params = useMemo(() => new URLSearchParams({ user: user?.uid }).toString(), [user])
  const { data: listings } = api.useGetListingsQuery(`?${params}`)
  const { data: logos } = api.useGetLogosQuery()
  const [deleteListing] = api.useDeleteListingsMutation()
  useEffect(() => {
    authCheck()
  }, []);
  const sideBarAddListing = () => {
    setShow(true)
  }
  const onOpen = (i) => {
    setShow(true)
    setEditId(i)
  }
  const onClose = () => {
    setShow(false)
    setEditId(null)
  }
  const onDelete = (d) => {
    const yes = confirm(`Are you sure to remove ${d.name}`)
    if (yes) {
      deleteListing(d.id)
    }
  }
  return (
    <Layout className="admin-bg">
      <div className="container mx-auto p-5 grid grid-cols-1 md:grid-cols-4 md:gap-5">
        <Sidebar addListing={sideBarAddListing} />
        <div className="col-span-3 space-y-10">
          {
            listings?.length ? listings.map((listing, i) => {
              const linksData = listing?.links ? JSON.parse(listing?.links) : []
              return <div key={i} className='drop-shadow-lg bg-gray-100 rounded p-4 md:p-5 mt-10 md:mt-0 space-y-5 border border-gray-200'>
                <div className='flex justify-between'>
                  <Link href={`/v/${friendlyUrl(listing.name)}`}>
                    <a target="_blank" className='bg-blue-500 px-3 py-1.5 rounded text-white hover:bg-blue-600 flex items-center'>
                      <HiOutlineEye className='mr-2' /> Public View
                    </a>
                  </Link>
                  <div className='flex space-x-2'>
                    <a className='bg-green-500 px-3 py-1.5 rounded text-white hover:bg-green-600 flex items-center cursor-pointer' onClick={() => onOpen(i)}>
                      <HiOutlinePencil className='mr-2' /> Edit
                    </a>
                    <a className='bg-rose-500 px-3 py-1.5 rounded text-white hover:bg-rose-600 flex items-center cursor-pointer' onClick={() => onDelete(listing)}>
                      <HiTrash className='mr-2' /> Delete
                    </a>
                  </div>
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
                    {linksData.map((link, j) => {
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
                  <label htmlFor="background">Background:</label>
                  <img src={listing?.background} alt="" />
                </div>
              </div>
            }
            ) : <div className='card drop-shadow-lg bg-gray-50 rounded p-4 md:p-5 mt-10 md:mt-0 space-y-5 border border-gray-200 h-96 flex items-center justify-center'>
              No listings available
            </div>
          }
        </div>
        <ListingForm listings={listings} show={show} onClose={onClose} editId={editId} />
      </div>
    </Layout>
  )
}