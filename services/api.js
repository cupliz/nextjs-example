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
  tagTypes: ['logos', 'listings', 'payments'],
  endpoints: build => ({
    getLogos: build.query({
      query: () => `/logos`,
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
  })
});

export default api;
