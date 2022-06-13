import React from 'react'
import { IoPersonCircleOutline, IoAlbumsOutline, IoLogOutOutline } from 'react-icons/io5'
import { HiOutlinePencil, HiOutlineSave, HiPlus } from 'react-icons/hi'
import { useAuth } from '../utils/hooks'

export default function Sidebar() {
  const { logout } = useAuth()
  return <aside className="col-span-1 overflow-y-auto py-4 px-3 bg-gray-50 rounded dark:bg-gray-800 h-auto h-60">
    <ul className="space-y-2  text-gray-800">
      <li>
        <a className="flex items-center p-2 text-base font-normal rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
          <IoAlbumsOutline className="w-6 h-6" />
          <span className="ml-3">Listings</span>
        </a>
      </li>
      <li>
        <a className="flex items-center p-2 text-base font-normal rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
          <HiPlus className="w-6 h-6" />
          <span className="ml-3">Add Listing</span>
        </a>
      </li>
      <li>
        <a className="flex items-center p-2 text-base font-normal rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
          <IoPersonCircleOutline className="w-6 h-6" />
          <span className="flex-1 ml-3 whitespace-nowrap">Account</span>
        </a>
      </li>
      <li>
        <a className="flex items-center p-2 text-base font-normal rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer" onClick={logout}>
          <IoLogOutOutline className="w-6 h-6" />
          <span className="flex-1 ml-3 whitespace-nowrap">Logout</span>
        </a>
      </li>
    </ul>
  </aside>
}