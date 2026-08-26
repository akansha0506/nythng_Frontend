import api from "@/utils/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchOrders = createAsyncThunk(
  "orders/fetchOrders",
  async ({ page = 1, limit = 5 }, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    if (!token) {
      return rejectWithValue("No token found");
    }
    try {
      const response = await api.get("/order/my-orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: { page, limit },
      });
      if (response || response.success) {
        return response.data;
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  orders: [],
  selectedOrder: null,
  loading: false,
  error: null,
  pagination: null,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setSelectedOrder: (state, action) => {
      state.selectedOrder = action.payload;
    },

    changeOrderData: (state, action) => {
      const { id, data } = action.payload;
      const orderIndex = state.orders.findIndex((order) => order._id === id);
      if (orderIndex !== -1) {
        state.orders[orderIndex] = { ...state.orders[orderIndex], ...data };
      }
    },
    resetOrderState: (state) => {
      state.orders = [];
      state.selectedOrder = null;
      state.loading = false;
      state.error = null;
      state.pagination = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload.orders;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setSelectedOrder, changeOrderData, resetOrderState } = orderSlice.actions;
export default orderSlice.reducer;
