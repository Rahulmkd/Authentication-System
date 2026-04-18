import { authApi } from "@/lib/api/auth";
import { RegisterUserFormData } from "@/lib/validators/auth";
import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuthenticated: false,
};

export const registerUserThunk = createAsyncThunk<
  any,
  RegisterUserFormData,
  { rejectValue: string }
>("auth/register", async (data, { rejectWithValue }) => {
  try {
    const res = await authApi.register(data);

    // tokenService.setToken(res.accessToken);

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
