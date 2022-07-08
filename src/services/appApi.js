import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const appApi = createApi({
  reducerPath: "appApi",
  baseQuery: fetchBaseQuery({
    // baseUrl: "http://localhost:8000",
    baseUrl :"https://mbdas.herokuapp.com",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().user.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Deceased"],
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (user) => ({
        url: "/users/login",
        method: "POST",
        body: user,
      }),
    }),
    loginOtpUser: builder.mutation({
      query: (user) => ({
        url: "/users/loginotp",
        method: "POST",
        body: user,
      }),
    }),
    signupUser: builder.mutation({
      query: (user) => ({
        url: "/users/",
        method: "POST",
        body: user,
      }),
    }),
    deleteAdminUser: builder.mutation({
      query: (email) => ({
        url: "/users/deleteAdmin",
        method: "POST",
        body: {email:email},
      }),
    }),
    logoutUser: builder.mutation({
      query: () => ({
        url: "/users/logout",
        method: "POST",
      }),
    }),
    // post routes
    createDeceased: builder.mutation({
      query: (details) => ({
        url: "/deceased/",
        method: "POST",
        body: details,
      }),
      invalidatesTags: ["Deceased"],
    }),
    createApplicant: builder.mutation({
      query: (details) => ({
        url: "/applicant/",
        method: "POST",
        body: details,
      }),
      // invalidatesTags: ["Post"],
    }),
    
    getAllDeceased: builder.query({
      query: () => ({
        url: "/deceased/alldeceased/",
      }),
      providesTags: ["Deceased"],
    }),
    getAllAdmin: builder.query({
      query: () => ({
        url: "/users/alladmin",
      }),
      //   providesTags: ["Post"],
    }),
  }),
});

export default appApi;
export const {
  useLoginUserMutation,
  useLoginOtpUserMutation,
  useSignupUserMutation,
  useDeleteAdminUserMutation,
  useLogoutUserMutation,
  useCreateApplicantMutation,
  useCreateDeceasedMutation,
  useGetAllDeceasedQuery,
  useGetAllAdminQuery,
} = appApi;
