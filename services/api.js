import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseUrl = process.env.NEXT_PUBLIC_API_URL;

const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = getState()?.auth?.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    }
  }),
  reducerPath: "api",
  tagTypes: [],
  endpoints: build => ({
    getLogos: build.query({
      query: () => `/logos`,
    }),

    getListings: build.query({
      query: (params) => ({
        url: `/listings${params || ''}`,
        method: "GET",
      }),
    }),
    editListings: build.mutation({
      query: ({ id, ...body }) => ({
        url: `/listings/${id}`,
        method: "PATCH",
        body
      }),
    }),
    deleteListings: build.mutation({
      query: ({ id }) => ({
        url: `/listings/${id}`,
        method: "DELETE"
      }),
    }),

    getPayments: build.query({
      query: (params) => `/payments${params || ''}`,
    }),
    createPayment: build.mutation({
      query: (body) => ({
        url: `/payments`,
        method: "POST",
        body
      }),
    }),
  })
});

export default api;
