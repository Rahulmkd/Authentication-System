import { createSlice } from "@reduxjs/toolkit";
import { AuthState } from "./auth.types";
import { fetchUser, loginUserThunk, registerUserThunk } from "./auth.thunks";
import { tokenService } from "@/lib/auth-token";

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      tokenService.clearToken();
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
    },
    // resolves loading when no token
    setAuthResolved: (state) => {
      state.isLoading = false;
    },

    clearError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      // 🔹 FETCH USER
      .addCase(fetchUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.isLoading = false;
      })
      .addCase(fetchUser.rejected, (state) => {
        state.user = null;
        state.isLoading = false;
        state.isAuthenticated = false;
      })

      // 🔹 LOGIN
      .addCase(loginUserThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUserThunk.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.isLoading = false;
      })
      .addCase(loginUserThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Login failed";
      })

      // 🔹 REGISTER
      .addCase(registerUserThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUserThunk.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.isLoading = false;
      })
      .addCase(registerUserThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Registration failed";
      });
  },
});

export const { logout, clearError, setAuthResolved } = authSlice.actions;
export default authSlice.reducer;
