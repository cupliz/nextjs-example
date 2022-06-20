import React, { useEffect, useMemo } from 'react'
import { IoLogoFacebook, IoLogoGoogle } from "react-icons/io5";
import Layout from '../../components/layout';
import Sidebar from '../../components/sidebar';
import { useAuth } from '../../utils/useAuth';

export default function account() {
  const { authCheck, user, auth } = useAuth()
  useEffect(() => {
    authCheck()
  }, []);
  const checkProvider = (key) => {
    if (key === 'google.com') {
      return <button className="bg-red-500 rounded-lg py-1 px-2 text-white flex items-center" disabled><IoLogoGoogle /> &nbsp; Google</button>
    }
    if (key === 'facebook.com') {
      return <button className="bg-red-500 rounded-lg py-1 px-2 text-white flex items-center" disabled><IoLogoFacebook /> &nbsp; Facebook</button>
    }
  }
  const { providerId, photoURL, displayName, email, phoneNumber } = auth?.currentUser?.providerData[0] || {}
  return (
    <Layout className="admin-bg">
      <div className="container mx-auto p-5 grid grid-cols-1 md:grid-cols-4 md:gap-5">
        <Sidebar />
        <div className="col-span-3">
          <div className='drop-shadow-lg bg-gray-50 rounded p-4 md:p-5 mt-10 md:mt-0 space-y-5 border border-gray-200'>
            <h1 className=''>You are logged in via:</h1>
            {checkProvider(providerId)}
            <img src={photoURL} alt="" referrerPolicy="no-referrer" />
            <div className='flex items-center'>
              <label className="w-20">Fullname</label>
              <input className='form-input border-none rounded bg-gray-100' type="text" disabled value={displayName || ''} />
            </div>
            <div className='flex items-center'>
              <label className="w-20">Email</label>
              <input className='form-input border-none rounded bg-gray-100' type="text" disabled value={email || ''} />
            </div>
            <div className='flex items-center'>
              <label className="w-20">Phone</label>
              <input className='form-input border-none rounded bg-gray-100' type="text" disabled value={phoneNumber || ''} />
            </div>
          </div>
        </div>
      </div>
    </Layout >
  )
}
