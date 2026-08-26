import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";
import { logoutUser } from "./authSlice";

// Thunks
export const fetchAddress = createAsyncThunk(
  "address/fetchAddress",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const response = await api.get("/address", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.addresses;
    } catch (error) {
      if (error.response?.status === 401) {
        dispatch(logoutUser());
        localStorage.clear();
        return rejectWithValue("Session expired. Please log in again.");
      }
      return rejectWithValue(error.response?.data?.message || "Fetch failed");
    }
  }
);

export const deleteAddress = createAsyncThunk(
  "address/deleteAddress",
  async (id, { rejectWithValue, dispatch }) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const response = await api.delete(`/address/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(fetchAddress());
      return response.data.message;
    } catch (err) {
      if (err.response?.status === 401) {
        dispatch(logoutUser());
        localStorage.clear();
        return rejectWithValue("Session expired. Please log in again.");
      }
      return rejectWithValue(err.response?.data?.message || "Delete failed");
    }
  }
);

export const setDefaultAddress = createAsyncThunk(
  "address/setDefaultAddress",
  async (id, { rejectWithValue, dispatch }) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const response = await api.patch(
        `/address/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(fetchAddress());
      return response.data.message;
    } catch (err) {
      if (err.response?.status === 401) {
        dispatch(logoutUser());
        localStorage.clear();
        return rejectWithValue("Session expired. Please log in again.");
      }
      return rejectWithValue(
        err.response?.data?.message || "Set default failed"
      );
    }
  }
);

export const addAddress = createAsyncThunk(
  "address/addAddress",
  async (formData, { rejectWithValue, dispatch }) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const response = await api.post("/address", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(fetchAddress());
      return response.data.message || "Address added successfully!";
    } catch (err) {
      if (err.response?.status === 401) {
        dispatch(logoutUser());
        localStorage.clear();
        return rejectWithValue("Session expired. Please log in again.");
      }
      return rejectWithValue(
        err.response?.data?.message || "Failed to add address"
      );
    }
  }
);
export const editAddress = createAsyncThunk(
  "address/editAddress",
  async ({ formData }, { rejectWithValue, dispatch }) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const response = await api.put(`/address/${formData._id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(fetchAddress());
      return response.data.message || "Address updated successfully!";
    } catch (err) {
      if (err.response?.status === 401) {
        dispatch(logoutUser());
        localStorage.clear();
        return rejectWithValue("Session expired. Please log in again.");
      }
      return rejectWithValue(
        err.response?.data?.message || "Failed to update address"
      );
    }
  }
);

// Slice
const addressSlice = createSlice({
  name: "address",
  initialState: {
    addresses: [],
    selectedAddress: null,
    loading: false,
    error: null,
    message: null,
  },
  reducers: {
    resetAddressState: (state) => {
      state.error = null;
      state.message = null;
      state.loading = false;
      state.addresses = [];
      state.selectedAddress = null;
    },
    setSelectedAddress: (state, action) => {
      state.selectedAddress = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchAddress
      .addCase(fetchAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAddress.fulfilled, (state, action) => {
        state.loading = false;
        state.addresses = action.payload;
        const defaultAddr = action.payload.find((addr) => addr.isDefault);
        state.selectedAddress = defaultAddr || {};
      })
      .addCase(fetchAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // deleteAddress
      .addCase(deleteAddress.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(setDefaultAddress.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(addAddress.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(addAddress.fulfilled, (state, action) => {
        state.message = action.payload;
      })
      .addCase(editAddress.fulfilled, (state, action) => {
        state.message = action.payload;
      })
      .addCase(editAddress.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { resetAddressState, setSelectedAddress } = addressSlice.actions;
export default addressSlice.reducer;
