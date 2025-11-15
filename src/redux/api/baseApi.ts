"use client";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { getCookie } from "../../utils/cookieUtils";

const backendUrl = process.env.NEXT_BACKEND_URL;

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: backendUrl || "https://todo-app.pioneeralpha.com",
    prepareHeaders: (headers, { getState }) => {
      // Try to get token from Redux state first, then fall back to cookies
      let token = (getState() as RootState).auth.token;

      // Only check cookies on the client side
      if (!token && typeof window !== "undefined") {
        const persistAuth = getCookie("persist:auth");
        if (persistAuth) {
          try {
            const authData = JSON.parse(persistAuth);
            token = authData.token;
          } catch (error) {
            console.error("Error parsing auth data from cookie:", error);
          }
        }
      }

      if (token) {
        // Remove quotes if they exist (common issue with token formatting)
        const cleanToken = token?.replace(/['"]+/g, "");
        headers.set("authorization", `Bearer ${cleanToken}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Profile", "tondos"],
  endpoints: () => ({}),
});
