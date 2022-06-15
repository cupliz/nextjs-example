import React, { useEffect } from 'react'
import Layout from '../../components/layout';
import Sidebar from '../../components/sidebar';
import { useAuth } from '../../utils/hooks';

export default function account() {
  const { authCheck, user } = useAuth()
  useEffect(() => {
    authCheck()
  }, []);
  
  return (
    <Layout className="admin-bg">
      <div className="container mx-auto p-5 grid grid-cols-1 md:grid-cols-4 md:gap-5">
        <Sidebar />
      </div>
    </Layout>
  )
}
