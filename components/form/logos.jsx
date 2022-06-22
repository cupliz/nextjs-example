import React, { Fragment, useEffect, useMemo, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { HiOutlineSave } from "react-icons/hi";
import api from "../../services/api";
import { onUpload } from "../../utils/helper";
import { useAuth } from "../../utils/useAuth";

export default function LogosForm({ data, show, onClose, editId }) {
  const { user } = useAuth();
  const [file, setfile] = useState(null);
  const [addLogos] = api.useAddLogosMutation();
  const uploadPreview = (e) => {
    setfile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const payload = Object.fromEntries(formData);
    if (payload.url.name) {
      const background = await onUpload(payload.url, "logos");
      if (!!background) {
        payload.key = background.match(/\/(.*?)\./)[1];
        payload.url = background;
      }
    } else {
      delete payload.background;
    }
    payload.user = user.uid;
    addLogos(payload);
    e.target.reset();
    onClose();
  };

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
          <div className="flex items-center justify-center p-4 text-center h-screen">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                as="form"
                encType="multipart/form-data"
                onSubmit={(e) => handleSubmit(e)}
                className="w-full bg-gray-100 overflow-hidden max-w-2xl rounded-2xl bg-white text-left align-middle shadow-xl transition-all pb-20"
              >
                <Dialog.Title
                  as="div"
                  className="flex justify-between items-center py-4 px-6"
                >
                  <h2 className="text-lg font-bold leading-6">Add Logo</h2>
                  <div className="flex space-x-2">
                    <button
                      type="submit"
                      className="bg-rose-500 px-3 py-1.5 rounded text-white hover:bg-rose-600 flex items-center cursor-pointer"
                    >
                      <HiOutlineSave className="mr-2" /> Save
                    </button>
                    <a
                      type="submit"
                      className="bg-gray-400 px-3 py-1.5 rounded text-white hover:bg-gray-500 flex items-center cursor-pointer"
                      onClick={onClose}
                    >
                      <HiOutlineSave className="mr-2" /> Cancel
                    </a>
                  </div>
                </Dialog.Title>
                <div className="h-full overflow-auto px-6 space-y-4">
                  <div>
                    <label htmlFor="name">Name:</label>
                    <input
                      name="name"
                      type="text"
                      className="form-input border-none w-full"
                      placeholder="Logo name"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="url" className="w-1/3">
                      Background URL
                    </label>
                    <input
                      onChange={uploadPreview}
                      name="url"
                      type="file"
                      accept="image/png, image/jpeg"
                      className="form-input border-none w-full"
                    />
                    <p className="text-xs text-gray-500 flex justify-end">
                      Upload a .png or .jpg image (max 1MB).
                    </p>
                    {file && (
                      <img
                        className="mt-4 w-32"
                        src={URL.createObjectURL(file)}
                        alt=""
                      />
                    )}
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
