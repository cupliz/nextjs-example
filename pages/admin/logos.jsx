import React, { useEffect, useMemo, useState } from "react";
import Layout from "../../components/layout";
import Sidebar from "../../components/sidebar";
import { useAuth } from "../../utils/useAuth";
import { cdn } from "../../utils/helper";
import api from "../../services/api";
import { HiOutlinePlus, HiTrash } from "react-icons/hi";
import LogosForm from "../../components/form/logos";

export default function account() {
  const { authCheck, user, auth } = useAuth();
  const [show, setShow] = useState(false);
  const { data: logos } = api.useGetLogosQuery();
  const [deleteMedia] = api.useDeleteMediaMutation();
  const [deleteLogos] = api.useDeleteLogosMutation();

  useEffect(() => {
    authCheck();
  }, []);
  const onRemove = (d) => {
    const yes = confirm(`Are you sure to remove ${d.name}`);
    if (yes) {
      deleteMedia(d.url);
      deleteLogos(d.key);
    }
  };

  const defaultLogos = useMemo(
    () => logos?.filter((x) => x.user == null) || [],
    [logos]
  );
  const userLogos = useMemo(
    () => logos?.filter((x) => x.user === user?.uid) || [],
    [user, logos]
  );
  return (
    <Layout className="admin-bg">
      <div className="container mx-auto p-5 grid grid-cols-1 md:grid-cols-4 md:gap-5">
        <Sidebar />
        <div className="col-span-3 space-y-4">
          <div className="drop-shadow-lg bg-gray-50 rounded p-4 md:p-5 mt-10 md:mt-0 space-y-5 border border-gray-200">
            <div className="flex justify-between">
              <h1 className="text-xl font-bold text-gray-500">User Logos</h1>
              <button
                className="bg-blue-500 px-2 py-1 rounded text-white hover:bg-blue-600 flex items-center"
                onClick={() => setShow(true)}
              >
                <HiOutlinePlus className="w-5 h-5" />
                <span className="ml-3">Add Logo</span>
              </button>
            </div>

            {userLogos.length ? (
              <table className="table-auto w-full">
                <thead>
                  <tr className="text-left text-gray-500">
                    <th>Name</th>
                    <th>Preview</th>
                    <th>Remove</th>
                  </tr>
                </thead>
                <tbody>
                  {userLogos?.map((l, i) => {
                    return (
                      <tr key={i}>
                        <td>{l.name}</td>
                        <td>
                          <img className="h-14" src={cdn(l.url)} alt={l.key} />
                        </td>
                        <td onClick={() => onRemove(l)}>
                          <button className="rounded-full bg-red-500 p-1">
                            <HiTrash className="h-5 w-5 text-white " />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            ) : null}
          </div>
          <div className="drop-shadow-lg bg-gray-50 rounded p-4 md:p-5 mt-10 md:mt-0 space-y-5 border border-gray-200">
            <h1 className="text-xl font-bold text-gray-500">Default Logos</h1>
            <table className="table-auto w-full">
              <thead>
                <tr className="text-left text-gray-500">
                  <th>Name</th>
                  <th>Preview</th>
                  {/* <th>Key</th> */}
                </tr>
              </thead>
              <tbody>
                {defaultLogos?.map((l, i) => {
                  return (
                    <tr key={i}>
                      <td>{l.name}</td>
                      <td>
                        <img className="h-14" src={cdn(l.url)} alt={l.key} />
                      </td>
                      {/* <td>{l.key}</td> */}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <LogosForm data={logos} show={show} onClose={() => setShow(false)} />
    </Layout>
  );
}
