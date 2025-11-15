"use client";
import React, { ReactNode, useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import { getCookie } from "../utils/cookieUtils";
import { setUser } from "./features/auth/authSlice";

const ProviderContent = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    // Hydrate auth state from cookies after component mounts on client
    const persistAuth = getCookie("persist:auth");
    if (persistAuth) {
      try {
        const authData = JSON.parse(persistAuth);
        if (authData.token) {
          store.dispatch(setUser({ token: authData.token }));
        }
      } catch (error) {
        console.error("Error parsing auth data from cookie:", error);
      }
    }
  }, []);

  return <Provider store={store}>{children}</Provider>;
};

export default ProviderContent;
