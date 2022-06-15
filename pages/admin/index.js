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
  const [editId, setEditId] = useState(null)
  const params = useMemo(() => new URLSearchParams({ user: user?.uid }).toString(), [user])
  const { data: listings } = api.useGetListingsQuery(`?${params}`)
  const { data: logos } = api.useGetLogosQuery()
  const [editListing] = api.useEditListingsMutation()
  useEffect(() => {
    authCheck()
  }, []);
  const handleSubmit = (e, id) => {
    e.preventDefault()
    const formData = new FormData(event.target);
    const rawData = Object.fromEntries(formData)
    const formated = Object.keys(rawData).reduce((o, key, i) => {
      const splitKey = key.split('.')
      if (splitKey.length > 1) {
        const [key2, index, att] = splitKey
        o[key2] = o[key2]?.length ? o[key2] : []
        const obj = { [att]: rawData[key] }
        if (o[key2][index]) {
          o[key2][index] = Object.assign(o[key2][index], obj)
        } else {
          o[key2].push(obj)
        }
      } else {
        o[key] = rawData[key]
      }
      return o
    }, {})
    const payload = { ...formated, name: friendlyUrl(formated.name), links: JSON.stringify(formated.links) }
    editListing({ ...payload, id })
    setEditId(null)
  }
  return (
    <Layout className="admin-bg">
      <div className="container mx-auto p-5 grid grid-cols-1 md:grid-cols-4 md:gap-5">
        <Sidebar />
        <div className="col-span-3">
          {
            listings?.length ? listings.map((listing, i) => {
              const linksData = listing?.links ? JSON.parse(listing?.links) : []
              const isEdit = editId == listing.id
              return <form key={i} className='drop-shadow-lg bg-gray-100 rounded p-4 md:p-5 mt-10 md:mt-0 space-y-5 border border-gray-200' onSubmit={(e) => handleSubmit(e, listing.id)}>
                <div className='flex justify-between'>
                  <Link href={`/v/${friendlyUrl(listing.name)}`}>
                    <a target="_blank" className='bg-blue-500 px-3 py-1.5 rounded text-white hover:bg-blue-600 flex items-center'>
                      <IoEyeOutline className='mr-2' /> Public View
                    </a>
                  </Link>
                  {editId ?
                    <div className='flex space-x-2'>
                      <button type="submit" className='bg-rose-500 px-3 py-1.5 rounded text-white hover:bg-rose-600 flex items-center cursor-pointer'>
                        <HiOutlineSave className='mr-2' /> Save
                      </button>
                      <a type="submit" className='bg-gray-400 px-3 py-1.5 rounded text-white hover:bg-gray-500 flex items-center cursor-pointer' onClick={() => setEditId(null)}>
                        <HiOutlineSave className='mr-2' /> Cancel
                      </a>
                    </div>
                    : <a className='bg-green-500 px-3 py-1.5 rounded text-white hover:bg-green-600 flex items-center cursor-pointer' onClick={() => setEditId(listing.id)}>
                      <HiOutlinePencil className='mr-2' /> Edit
                    </a>
                  }
                </div>
                <div>
                  <label htmlFor="links">Name:</label>
                  <div>{isEdit ? <input name="name" type="text" className="form-input border-none w-full" placeholder="Listing name" defaultValue={listing?.name} /> : listing?.name}</div>
                </div>
                <div>
                  <label htmlFor="links">Heading:</label>
                  <div>{isEdit ? <input name="title" type="text" className="form-input border-none w-full" placeholder="Page heading" defaultValue={listing?.title} /> : listing?.title}</div>
                </div>
                <div>
                  <label htmlFor="links">Links:</label>
                  {editId ?
                    linksData.map((link, j) => {
                      return <div key={j} className="mt-5 space-y-2">
                        <div className='flex'>
                          <label htmlFor="logo" className='w-1/3'>Logo</label>
                          <select name={`links.${j}.logo`} id="logo" className='form-select border-none w-full' defaultValue={link.logo}>
                            {logos?.map((x, h) => <option key={h} value={x.key}>{x.name}</option>)}
                          </select>
                        </div>
                        <div className='flex'>
                          <label htmlFor="url" className='w-1/3'>Property URL</label>
                          <textarea name={`links.${j}.url`} id="url" type="text"
                            placeholder='Property URL'
                            className='form-input border-none w-full'
                            defaultValue={link.url}
                          />
                        </div>
                      </div>
                    })
                    : <div className='flex space-x-5'>
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
                  }
                </div>
                <div>
                  <label htmlFor="background">Background:</label>
                  {editId && <div className='flex items-center'>
                    <label htmlFor="url" className='w-1/3'>URL</label>
                    <textarea name="background" type="text" className="form-input border-none w-full mb-4" placeholder="Listing name" defaultValue={listing?.background} />
                  </div>}
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