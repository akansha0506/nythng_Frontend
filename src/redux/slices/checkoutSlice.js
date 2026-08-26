import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/utils/api";
import { changeOrderData } from "./orderSlice";

export const placeOrder = createAsyncThunk(
  "checkout/placeOrder",
  async (orderData, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    if (!token) {
      return rejectWithValue({ message: "No token found" });
    }
    try {
      const response = await api.post("/checkout/create-order", orderData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const cancelOrder = createAsyncThunk(
  "checkout/cancelOrder",
  async (id, { dispatch, rejectWithValue }) => {
    const token = localStorage.getItem("token");
    if (!token) {
      return rejectWithValue({ message: "No token found" });
    }
    try {
      const response = await api.get(`/checkout/cancel-order/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response && response.data.success) {
        dispatch(changeOrderData({ id, data: response.data.order }));
        return { success: true, id, data: response.data };
      }
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
const initialState = {
  loading: false,
  error: null,
  success: false,
};

const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    resetCheckoutState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(placeOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(placeOrder.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(cancelOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(cancelOrder.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(cancelOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetCheckoutState } = checkoutSlice.actions;

export default checkoutSlice.reducer;
