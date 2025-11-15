/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { getCookie, removeCookie, setCookie } from "../../../utils/cookieUtils";

type TAuthState = {
  token: string | null;
};

// Initialize from cookies using persist:auth key on client side
const getInitialState = (): TAuthState => {
  if (typeof window !== "undefined") {
    const persistAuth = getCookie("persist:auth");
    if (persistAuth) {
      try {
        const authData = JSON.parse(persistAuth);
        return {
          token: authData.token || null,
        };
      } catch (error) {
        console.error("Error parsing auth data from cookie:", error);
        return {
          token: null,
        };
      }
    }
  }
  return {
    token: null,
  };
};

const authSlice = createSlice({
  name: "auth",
  initialState: getInitialState(),
  reducers: {
    setUser: (state, action) => {
      const { token } = action.payload;
      state.token = token;
      // Only set cookie in browser environment with persist:auth key
      if (typeof window !== "undefined" && token) {
        const authData = { token };
        setCookie("persist:auth", JSON.stringify(authData), 30); // 30 days expiration
      }
    },
    logout: (state) => {
      state.token = null;
      // Only remove cookie in browser environment
      if (typeof window !== "undefined") {
        removeCookie("persist:auth");
      }
    },
  },
});

export const { setUser, logout } = authSlice.actions;

export default authSlice.reducer;

// Selector that retrieves token from cookies if not in state
export const selectToken = (state: RootState) => {
  if (typeof window !== "undefined") {
    // First check the Redux state
    if (state.auth.token) {
      return state.auth.token;
    }
    // Fallback to cookie
    const persistAuth = getCookie("persist:auth");
    if (persistAuth) {
      try {
        const authData = JSON.parse(persistAuth);
        return authData.token || null;
      } catch (error) {
        console.error("Error parsing auth data from cookie:", error);
        return null;
      }
    }
  }
  return state.auth.token;
};

// Alternative selector name
export const selectTokenWithCookieFallback = selectToken;
