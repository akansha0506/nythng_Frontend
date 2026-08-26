import api from "@/utils/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { resetWishlistState } from "./wishlistSlice";
import { resetCartState } from "./cartSlice";
import { resetAddressState } from "./addressSlice";
import { resetCheckoutState } from "./checkoutSlice";
import { resetOrderState } from "./orderSlice";

export const signup = createAsyncThunk(
  "/auth/signup",
  async (formdata, { rejectWithValue }) => {
    try {
      const res = await api.post("/auth/signup", formdata);
      return res.data;
    } catch (error) {
      // console.log(error);
      return rejectWithValue(
        error?.response.data.message || "Failed to sign up"
      );
    }
  }
);

export const verifyEmail = createAsyncThunk(
  "auth/verifyEmail",
  async ({ email, otp }, { rejectWithValue }) => {
    try {
      const res = await api.post("/auth/verify-email", { email, otp });
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error?.response.data.message || "Failed to verify email"
      );
    }
  }
);

export const loginUser = createAsyncThunk(
  "/auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const res = await api.post("/auth/login", { email, password });
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error?.response.data.message || "Failed to log in"
      );
    }
  }
);

export const resendOtp = createAsyncThunk(
  "auth/resend-otp",
  async (email, { rejectWithValue }) => {
    try {
      const res = await api.post("/auth/resend-otp", { email });
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error?.response.data.message || "Failed to resend OTP"
      );
    }
  }
);

export const verifyToken = createAsyncThunk(
  "auth/verify-token",
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem("token");

    if (!token) {
      return rejectWithValue("Token missing. Please log in.");
    }

    try {
      const res = await api.get("/auth/verify-token", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return { success: true, data: res.data.data };
    } catch (error) {
      const message =
        error?.response?.data?.message || "Failed to verify token";
      return rejectWithValue(message);
    }
  }
);

export const updateMe = createAsyncThunk(
  "auth/update-me",
  async (formData, { rejectWithValue }) => {
    const token = localStorage.getItem("token");

    if (!token) {
      return rejectWithValue("Token missing. Please log in.");
    }

    try {
      const res = await api.put("/user/me", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return { success: true, data: res.data.user };
    } catch (error) {
      const message =
        error?.response?.data?.message || "Failed to update profile";
      return rejectWithValue(message);
    }
  }
);

export const updatePassword = createAsyncThunk(
  "auth/update-password",
  async (formData, { rejectWithValue }) => {
    const token = localStorage.getItem("token");

    if (!token) {
      return rejectWithValue("Token missing. Please log in.");
    }

    try {
      const res = await api.patch("/user/update-password", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return { success: true, message: res.data.message };
    } catch (error) {
      const message =
        error?.response?.data?.message || "Failed to update password";
      return rejectWithValue(message);
    }
  }
);

export const forgotPassword = createAsyncThunk(
  "auth/forgot-password",
  async (email, { rejectWithValue }) => {
    try {
      const res = await api.post("/auth/forgot-password", { email });
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error?.response.data.message || "Failed to send OTP"
      );
    }
  }
);

export const resetPassword = createAsyncThunk(
  "auth/reset-password",
  async (formdata, { rejectWithValue }) => {
    try {
      const res = await api.patch("/auth/reset-password", formdata);
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error?.response.data.message || "Failed to reset password"
      );
    }
  }
);

export const resetAllState = createAsyncThunk(
  "auth/reset-all-state",
  async (_, { dispatch }) => {
    localStorage.removeItem("token");
    dispatch(resetAddressState());
    dispatch(resetCartState());
    dispatch(resetCheckoutState());
    dispatch(resetOrderState());
    dispatch(resetWishlistState());
    return {};
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isAuthenticated: false,
  },
  reducers: {
    logoutUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(verifyEmail.pending, (state) => {
        state.loading = true;
      })
      .addCase(verifyEmail.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        localStorage.setItem("token", action.payload.token);
        state.isAuthenticated = true;
      })
      .addCase(verifyEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload);

        if (action.payload.user) {
          state.user = action.payload.user;
        }

        if (action.payload.success && action.payload.isVerified) {
          state.isAuthenticated = true;
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(verifyToken.pending, (state) => {
        state.loading = true;
      })
      .addCase(verifyToken.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data;
        state.isAuthenticated = true;
      })
      .addCase(verifyToken.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateMe.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateMe.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data;
      })
      .addCase(updateMe.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updatePassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(updatePassword.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updatePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logoutUser } = authSlice.actions;

export default authSlice.reducer;
