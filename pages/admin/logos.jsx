import React, { useEffect, useMemo } from "react";
import Layout from "../../components/layout";
import Sidebar from "../../components/sidebar";
import { useAuth } from "../../utils/useAuth";

export default function account() {
  const { authCheck, user, auth } = useAuth();
  useEffect(() => {
    authCheck();
  }, []);
  return (
    <Layout className="admin-bg">
      <div className="container mx-auto p-5 grid grid-cols-1 md:grid-cols-4 md:gap-5">
        <Sidebar />
        <div className="col-span-3">
          <div className="drop-shadow-lg bg-gray-50 rounded p-4 md:p-5 mt-10 md:mt-0 space-y-5 border border-gray-200">
          </div>
        </div>
      </div>
    </Layout>
  );
}
