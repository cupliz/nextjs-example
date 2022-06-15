import React from 'react'
import Link from 'next/link'
import { HiOutlineCreditCard, HiOutlineUser, HiOutlinePlus, HiOutlineLogout, HiOutlineCollection } from 'react-icons/hi'
import { useAuth } from '../utils/hooks'

export default function Sidebar({addListing}) {
  const { logout } = useAuth()
  return <aside className="col-span-1 overflow-y-auto py-4 px-3 bg-gray-50 rounded dark:bg-gray-800 h-auto h-72">
    <ul className="space-y-2  text-gray-800">
      <li>
        <Link href="/admin">
          <a className="flex items-center p-2 text-base font-normal rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
            <HiOutlineCollection className="w-6 h-6" />
            <span className="ml-3">Listings</span>
          </a>
        </Link>
      </li>
      <li>
        <a className="flex items-center p-2 text-base font-normal rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer" onClick={addListing}>
          <HiOutlinePlus className="w-6 h-6" />
          <span className="ml-3">Add Listing</span>
        </a>
      </li>
      <li>
        <Link href="/admin/account">
          <a className="flex items-center p-2 text-base font-normal rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
            <HiOutlineUser className="w-6 h-6" />
            <span className="flex-1 ml-3 whitespace-nowrap">Account</span>
          </a>
        </Link>
      </li>
      <li>
        <Link href="/admin/payments">
          <a className="flex items-center p-2 text-base font-normal rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
            <HiOutlineCreditCard className="w-6 h-6" />
            <span className="flex-1 ml-3 whitespace-nowrap">Payments</span>
          </a>
        </Link>
      </li>
      <li>
        <a className="flex items-center p-2 text-base font-normal rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer" onClick={logout}>
          <HiOutlineLogout className="w-6 h-6" />
          <span className="flex-1 ml-3 whitespace-nowrap">Logout</span>
        </a>
      </li>
    </ul>
  </aside>
}