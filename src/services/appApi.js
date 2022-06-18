import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const appApi = createApi({
  reducerPath: "appApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().user.token;
      if (token) {
        headers.set("Authorization", `Bearer${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Post", "User"],
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (user) => ({
        url: "/users/login",
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
    logoutUser: builder.mutation({
      query: () => ({
        url: "/users/logout",
        method: "DELETE",
      }),
    }),
    // post routes
    // createPost: builder.mutation({
    //   query: (article) => ({
    //     url: "/posts/",
    //     method: "POST",
    //     body: article,
    //   }),
    //   invalidatesTags: ["Post"],
    // }),
    // getAllPost: builder.query({
    //   query: () => ({
    //     url: "/posts",
    //   }),
    //   providesTags: ["Post"],
    // }),
    // getOnePost: builder.query({
    //   query: (id) => ({
    //     url: `/posts/${id}`,
    //   }),
    // }),
    // getAllUserPosts: builder.query({
    //   query: () => ({
    //     url: "/posts/me",
    //   }),
    //   providesTags: ["Post"],
    // }),
  }),
});

export default appApi;
export const {
  useLoginUserMutation,
  useSignupUserMutation,
  useLogoutUserMutation,
//   useCreatePostMutation,
//   useGetAllPostQuery,
//   useGetOnePostQuery,
//   useGetAllUserPostsQuery,
} = appApi;

