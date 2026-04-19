import { authApi } from "@/lib/api/auth";
import { tokenService } from "@/lib/auth-token";
import { RegisterUserFormData } from "@/lib/validators/auth";
import { IUser } from "@/types";
import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

interface AuthState {
  user: IUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
};
export const registerUserThunk = createAsyncThunk<
  any,
  RegisterUserFormData,
  { rejectValue: string }
>("auth/register", async (data, { rejectWithValue }) => {
  try {
    const res = await authApi.register(data);

    // store token
    tokenService.setToken(res.accessToken);

    return res.user;
  } catch (error: any) {
    return rejectWithValue(
      error?.response?.data?.message || "Registration failed",
    );
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Register

      .addCase(registerUserThunk.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
      });
  },
});

export default authSlice.reducer;
