/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice,  } from "@reduxjs/toolkit";
import { RootState } from "../../store";

// Define the type for the auth state
 type TAuthState = {
  token: string | null; 
};

const initialState: TAuthState = {
  token: null,
};

// Create the slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const {  token } = action.payload;
      state.token = token;
    },
    logout: (state) => {
      state.token = null;
    },
  },
});

export const { setUser, logout,} = authSlice.actions;

export default authSlice.reducer;

export const selectToken = (state: RootState) => state.auth.token;

