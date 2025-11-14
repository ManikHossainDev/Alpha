import { baseApi } from "@/redux/api/baseApi";
const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: "/api/auth/login/",
        method: "POST",
        body: data,
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: "/api/users/signup/",
        method: "POST",
        body: data,
      }),
    }),
    forgetPassword: builder.mutation({
      query: (data) => ({
        url: "/api/v1/auth/forgot-password",
        method: "POST",
        body: data,
      }),
    }),
    resitPassword: builder.mutation({
      query: (data) => ({
        url: `/api/v1/auth/reset-password`,
        method: "POST",
        body: data,
      }),
    }),
    changePassword: builder.mutation({
      query: (data) => ({
        url: `/auth/change-password-in-settings`,
        method: "POST",
        body: data,
      }),
    }),
    verifyAccount: builder.mutation({
      query: (data) => ({
        url: `/api/v1/auth/verify-email`,
        method: "POST",
        body: data,
      }),
    }),
    verifyEmail: builder.mutation({
      query: (data) => ({
        url: `/api/v1/auth/verify-email`,
        method: "POST",
        body: data,
      }),
    }),
     getSingleUser: builder.query({
      query: (id) => ({
        url: `/auth/get-user-details-with-id?user_id=${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useForgetPasswordMutation,
  useResitPasswordMutation,
  useChangePasswordMutation,
  useVerifyEmailMutation,
  useVerifyAccountMutation,
  useGetSingleUserQuery, 
} = authApi;
