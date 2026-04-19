import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { authApi } from "@/lib/api/authApi";
import { tokenService } from "@/lib/auth-token";
import { IUser, AuthResponse } from "./auth.types";
import { LoginUserFormData, RegisterUserFormData } from "@/lib/validators/auth";

// 🔹 helper
const getErrorMessage = (error: unknown, fallback: string) => {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message || fallback;
  }
  if (error instanceof Error) {
    return error.message;
  }
  return fallback;
};

// 🔹 Fetch user
export const fetchUser = createAsyncThunk<IUser, void, { rejectValue: string }>(
  "auth/fetchUser",
  async (_, { rejectWithValue }) => {
    try {
      const res = await authApi.getMe();
      return res.user;
    } catch (error: unknown) {
      return rejectWithValue(getErrorMessage(error, "Failed to fetch user"));
    }
  },
);

// 🔹 Login
export const loginUserThunk = createAsyncThunk<
  IUser,
  LoginUserFormData,
  { rejectValue: string }
>("auth/login", async (data, { rejectWithValue }) => {
  try {
    const res: AuthResponse = await authApi.login(data);

    tokenService.setToken(res.accessToken);

    return res.user;
  } catch (error: unknown) {
    return rejectWithValue(getErrorMessage(error, "Login failed"));
  }
});

// 🔹 Register
export const registerUserThunk = createAsyncThunk<
  IUser,
  RegisterUserFormData,
  { rejectValue: string }
>("auth/register", async (data, { rejectWithValue }) => {
  try {
    const res: AuthResponse = await authApi.register(data);

    tokenService.setToken(res.accessToken);

    return res.user;
  } catch (error: unknown) {
    return rejectWithValue(getErrorMessage(error, "Registration failed"));
  }
});