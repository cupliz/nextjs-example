import React, { Fragment, useEffect, useMemo, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  HiOutlineMinusCircle,
  HiOutlinePlusCircle,
  HiOutlineSave,
} from "react-icons/hi";
import ReactSelect from "react-select";
import api from "../../services/api";
import { cdn, onUpload } from "../../utils/helper";
import { useAuth } from "../../utils/useAuth";

export default function ListingForm({ listings, show, onClose, editId }) {
  const { user } = useAuth();
  const [linksData, setLinksData] = useState([]);
  const [file, setfile] = useState(null);
  const { data: logos } = api.useGetLogosQuery();
  const [editListing] = api.useEditListingsMutation();
  const [addListing] = api.useAddListingsMutation();
  const [deleteMedia] = api.useDeleteMediaMutation();

  const data = useMemo(
    () => (editId !== null ? listings[editId] : {}),
    [editId]
  );

  const addLinks = () => {
    setLinksData([
      ...linksData,
      { logo: "airbnb_square", url: "https://www.airbnb.com/" },
    ]);
  };
  const deleteLinks = (index) => {
    const newLinks = [...linksData];
    newLinks.splice(index, 1);
    setLinksData(newLinks);
  };

  const uploadPreview = (e) => {
    setfile(e.target.files[0]);
  };

  const handleSubmit = async (e, id) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const rawData = Object.fromEntries(formData);
    const formated = Object.keys(rawData).reduce((o, key, i) => {
      const splitKey = key.split(".");
      if (splitKey.length > 1) {
        const [key2, index, att] = splitKey;
        o[key2] = o[key2]?.length ? o[key2] : [];
        const obj = { [att]: rawData[key] };
        if (o[key2][index]) {
          o[key2][index] = Object.assign(o[key2][index], obj);
        } else {
          o[key2].push(obj);
        }
      } else {
        o[key] = rawData[key];
      }
      return o;
    }, {});
    formated.links = formated.links ? JSON.stringify(formated.links) : "";
    if (formated.background.name) {
      const background = await onUpload(formated.background);
      if (!!background) {
        formated.background = background;
        deleteMedia(data.background);
      }
    } else {
      delete formated.background;
    }
    if (editId !== null) {
      editListing({ ...formated, id });
    } else {
      formated.user = user.uid;
      addListing(formated);
    }
    e.target.reset();
    onClose();
  };

  useEffect(() => {
    if (editId !== null && listings[editId]?.links) {
      setLinksData(JSON.parse(listings[editId]?.links));
    } else {
      setLinksData([]);
      setfile(null);
    }
  }, [editId]);

  const imageBackground = file
    ? URL.createObjectURL(file)
    : data?.background
    ? cdn(data?.background)
    : "";

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
                onSubmit={(e) => handleSubmit(e, data?.id)}
                className="w-full h-full bg-gray-100 overflow-hidden max-w-2xl rounded-2xl bg-white text-left align-middle shadow-xl transition-all pb-20"
              >
                <Dialog.Title
                  as="div"
                  className="flex justify-between items-center py-4 px-6"
                >
                  <h2 className="text-lg font-bold leading-6">
                    {editId !== null ? "Edit" : "Add"} Listing {data.id}
                  </h2>
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
                      placeholder="Listing name"
                      defaultValue={data?.name}
                    />
                  </div>
                  <div>
                    <label htmlFor="name">Descriptions:</label>
                    <textarea
                      name="desc"
                      type="text"
                      className="form-input border-none w-full"
                      placeholder="Listing descriptions"
                      defaultValue={data?.desc}
                    />
                  </div>
                  <div>
                    <label htmlFor="title">Heading:</label>
                    <input
                      name="title"
                      type="text"
                      className="form-input border-none w-full"
                      placeholder="Page heading"
                      defaultValue={data?.title}
                    />
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="theme">Theme:</label>
                      <select
                        name="theme"
                        id="theme"
                        defaultValue={data?.theme}
                        className="form-select border-none w-full"
                      >
                        <option value="light">Light</option>
                        <option value="dark">Dark</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="ga">Google Analytics:</label>
                      <input
                        name="ga"
                        type="text"
                        className="form-input border-none w-full"
                        placeholder="ex: G-xxxxxx"
                        defaultValue={data?.ga}
                      />
                    </div>
                    <div>
                      <label htmlFor="fb">Facebook Pixel:</label>
                      <input
                        name="fb"
                        type="text"
                        className="form-input border-none w-full"
                        placeholder="ex: F-xxxxxx"
                        defaultValue={data?.fb}
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="links" className="flex justify-between">
                      Links:
                      <HiOutlinePlusCircle
                        className="w-6 h-6 text-green-500 cursor-pointer"
                        onClick={addLinks}
                      />
                    </label>
                    {linksData.map((link, j) => {
                      const selectOptions = logos.map((x) => {
                        return {
                          value: x.key,
                          label: x.name,
                          image: cdn(x.url),
                        };
                      });
                      const defaultValue = selectOptions.find(
                        (option) => option.value === link.logo
                      );
                      return (
                        <div key={j} className="mt-4 flex">
                          <div className="w-full space-y-2">
                            <div className="flex">
                              <label htmlFor="logo" className="w-1/3">
                                Logo
                              </label>

                              <ReactSelect
                                id="logo"
                                name={`links.${j}.logo`}
                                className="border-none w-full"
                                value={defaultValue}
                                options={selectOptions}
                                formatOptionLabel={(logo, i) => (
                                  <div
                                    key={i}
                                    className="flex items-center space-x-4"
                                  >
                                    <img
                                      className="w-10"
                                      src={logo.image}
                                      alt={logo.key}
                                    />
                                    <span>{logo.label}</span>
                                  </div>
                                )}
                              />
                              {/* <select
                                name={`links.${j}.logo`}
                                id="logo"
                                className="form-select border-none w-full"
                                defaultValue={link.logo}
                              >
                                {logos?.map((x, h) => (
                                  <option key={h} value={x.key}>
                                    {x.name}
                                  </option>
                                ))}
                              </select> */}
                            </div>
                            <div className="flex">
                              <label htmlFor="url" className="w-1/3">
                                Property URL
                              </label>
                              <textarea
                                name={`links.${j}.url`}
                                id="url"
                                type="text"
                                placeholder="Property URL"
                                className="form-input border-none w-full"
                                defaultValue={link.url}
                              />
                            </div>
                          </div>
                          <HiOutlineMinusCircle
                            className="w-6 h-6 text-red-500 cursor-pointer"
                            onClick={() => deleteLinks(j)}
                          />
                        </div>
                      );
                    })}
                  </div>
                  <div>
                    <label htmlFor="url" className="w-1/3">
                      Background URL
                    </label>
                    <input
                      onChange={uploadPreview}
                      name="background"
                      type="file"
                      accept="image/png, image/jpeg"
                      className="form-input border-none w-full"
                    />
                    <p className="text-xs text-gray-500 flex justify-end">
                      Upload a .png or .jpg image (max 1MB).
                    </p>
                    {imageBackground && (
                      <img className="mt-4" src={imageBackground} alt="" />
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
