import React, { Fragment, useEffect, useMemo, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { HiOutlineMinusCircle, HiOutlinePlusCircle, HiOutlineSave } from 'react-icons/hi'
import api from '../services/api'
import { friendlyUrl } from '../utils/helper'
import { useAuth } from '../utils/useAuth'

export default function ListingForm({ listings, show, onClose, editId }) {
  const { user } = useAuth()
  const [linksData, setLinksData] = useState([])
  const { data: logos } = api.useGetLogosQuery()
  const [editListing] = api.useEditListingsMutation()
  const [addListing] = api.useAddListingsMutation()
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
    const payload = { ...formated, name: friendlyUrl(formated.name), links: formated.links ? JSON.stringify(formated.links) : '' }
    if (editId !== null) {
      editListing({ ...payload, id })
    } else {
      payload.user = user.uid
      addListing(payload)
    }
    onClose()
  }
  const addLinks = () => {
    setLinksData([...linksData, { logo: 'airbnb_square', url: 'https://www.airbnb.com/' }])
  }
  const deleteLinks = (index) => {
    const newLinks = [...linksData]
    newLinks.splice(index, 1)
    setLinksData(newLinks)
  }

  const data = useMemo(() => editId !== null ? listings[editId] : {}, [editId])
  useEffect(() => {
    if (editId !== null && listings[editId]?.links) {
      setLinksData(JSON.parse(listings[editId]?.links))
    } else {
      setLinksData([])
    }
  }, [editId])

  return (
    <Transition appear show={show} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-2xl transform overflow-auto rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <form onSubmit={(e) => handleSubmit(e, data?.id)} className="space-y-4">
                  <Dialog.Title className="text-lg font-bold leading-6 mb-4 flex justify-between items-center" >
                    {editId ? 'Edit' : 'Add'} Listing {data.id}
                    <div className='flex space-x-2 mt-4'>
                      <button type="submit" className='bg-rose-500 px-3 py-1.5 rounded text-white hover:bg-rose-600 flex items-center cursor-pointer'>
                        <HiOutlineSave className='mr-2' /> Save
                      </button>
                      <a type="submit" className='bg-gray-400 px-3 py-1.5 rounded text-white hover:bg-gray-500 flex items-center cursor-pointer' onClick={onClose}>
                        <HiOutlineSave className='mr-2' /> Cancel
                      </a>
                    </div>
                  </Dialog.Title>
                  <div className='mt-5'>
                    <label htmlFor="links">Name:</label>
                    <input name="name" type="text" className="form-input bg-gray-100 border-none w-full" placeholder="Listing name" defaultValue={data?.name} />
                  </div>
                  <div>
                    <label htmlFor="links">Heading:</label>
                    <input name="title" type="text" className="form-input bg-gray-100 border-none w-full" placeholder="Page heading" defaultValue={data?.title} />
                  </div>
                  <div>
                    <label htmlFor="links" className='flex justify-between'>
                      Links:
                      <HiOutlinePlusCircle className='w-6 h-6 text-green-500 cursor-pointer' onClick={addLinks} />
                    </label>
                    {linksData.map((link, j) => {
                      return <div key={j} className="mt-4 flex">
                        <div className='w-full  space-y-2'>
                          <div className='flex'>
                            <label htmlFor="logo" className='w-1/3'>Logo</label>
                            <select name={`links.${j}.logo`} id="logo" className='form-select bg-gray-100 border-none w-full' defaultValue={link.logo}>
                              {logos?.map((x, h) => <option key={h} value={x.key}>{x.name}</option>)}
                            </select>
                          </div>
                          <div className='flex'>
                            <label htmlFor="url" className='w-1/3'>Property URL</label>
                            <textarea name={`links.${j}.url`} id="url" type="text"
                              placeholder='Property URL'
                              className='form-input bg-gray-100 border-none w-full'
                              defaultValue={link.url}
                            />
                          </div>
                        </div>
                        <HiOutlineMinusCircle className='w-6 h-6 text-red-500 cursor-pointer' onClick={() => deleteLinks(j)} />
                      </div>
                    })}
                  </div>
                  <div>
                    <label htmlFor="url" className='w-1/3'>Background URL</label>
                    <textarea name="background" type="text" className="form-input bg-gray-100 border-none w-full mb-4" placeholder="Listing name" defaultValue={data?.background} />
                    <img src={data?.background} alt="" />
                  </div>
                </form>

              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>

  )
}
