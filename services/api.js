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
  tagTypes: ['logos', 'listings', 'payments', 'media'],
  endpoints: build => ({
    getLogos: build.query({
      query: () => `/logos`,
      providesTags: ['logos'],
    }),
    addLogos: build.mutation({
      query: (body) => {
        return {
          url: `/logos`,
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body
        }
      },
      invalidatesTags: ['logos'],
    }),
    deleteLogos: build.mutation({
      query: (key) => ({
        url: `/logos?key=${key}`,
        method: "DELETE"
      }),
      invalidatesTags: ['logos'],
    }),

    getListings: build.query({
      query: (params) => ({
        url: `/listings${params || ''}`,
        method: "GET",
      }),
      providesTags: ['listings'],
      // providesTags: (result) =>
      //   result ? result.map(({ id }) => ({ type: 'listings', id })) : [],
    }),
    addListings: build.mutation({
      query: (body) => {
        return {
          url: `/listings`,
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body
        }
      },
      invalidatesTags: ['listings'],
    }),
    editListings: build.mutation({
      query: ({ id, ...body }) => {
        return {
          url: `/listings?id=${id}`,
          method: "PATCH",
          headers: {
            'Content-Type': 'application/json',
          },
          body
        }
      },
      invalidatesTags: ['listings'],
    }),
    deleteListings: build.mutation({
      query: (id) => ({
        url: `/listings?id=${id}`,
        method: "DELETE"
      }),
      invalidatesTags: ['listings'],
    }),

    getPayments: build.query({
      query: (params) => `/payments?${params || ''}`,
      providesTags: ['payments'],
    }),
    createPayment: build.mutation({
      query: ({ type, ...body }) => {
        return {
          url: `/payments?type=${type}`,
          method: "POST",
          body
        }
      },
      invalidatesTags: ['payments'],
    }),
    // 
    getMedia: build.query({
      query: (params) => `/media?${params || ''}`,
      providesTags: ['media'],
    }),
    deleteMedia: build.mutation({
      query: (name) => {
        return {
          url: `/media?name=${name}`,
          method: "DELETE",
        }
      },
      invalidatesTags: ['media'],
    }),

  })
});

export default api;
