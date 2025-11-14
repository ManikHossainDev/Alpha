"use client";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
const backendUrl = process.env.NEXT_BACKEND_URL;
export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: backendUrl || "https://todo-app.pioneeralpha.com",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token?.replace(/['"]+/g, "");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: [
    "Profile",
    "tondos"
  ],
  endpoints: () => ({}),
});
