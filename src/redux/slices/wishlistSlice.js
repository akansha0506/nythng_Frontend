import api from "@/utils/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchWishlist = createAsyncThunk(
  "wishlist/fetch",
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    if (!token) {
      return rejectWithValue("Unauthorized");
    }
    try {
      const res = await api.get("/wishlist", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addToWishlist = createAsyncThunk(
  "wishlist/add",
  async ({ productId, sku }, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    if (!token) {
      return rejectWithValue("Unauthorized");
    }
    try {
      const res = await api.post(
        "/wishlist",
        { productId, sku },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return { data: res.data, productId };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const removeFromWishlist = createAsyncThunk(
  "wishlist/remove",
  async ({ productId, sku }, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    if (!token) {
      return rejectWithValue("Unauthorized");
    }
    try {
      const res = await api.patch(
        `/wishlist`,
        { productId, sku },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return { data: res.data, productId };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  wishlist: [],
  wishlistIds: [],
  error: null,
  loading: false,
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addIdsToWishlist: (state, action) => {
      const product = action.payload;
      state.wishlistIds.push(product.productId);
    },
    removeIdFromWishlist: (state, action) => {
      const id = action.payload;
      state.wishlistIds = state.wishlistIds.filter((itemId) => itemId !== id);
    },
    resetWishlistState: (state) => {
      state.wishlist = [];
      state.wishlistIds = [];
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.wishlist = action.payload.wishlist;
        const products = action.payload.wishlist.products || [];
        const filterIds = products.map((product) => product.productId);
        state.wishlistIds = filterIds;
      })
      .addCase(fetchWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addToWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.wishlist = action.payload.data;
        state.wishlistIds.push(action.payload.productId);
      })
      .addCase(addToWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(removeFromWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeFromWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.wishlist = action.payload.data.wishlist;
        state.wishlistIds = state.wishlistIds.filter(
          (id) => id !== action.payload.productId
        );
      })
      .addCase(removeFromWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { addIdsToWishlist, removeIdFromWishlist, resetWishlistState } =
  wishlistSlice.actions;
export default wishlistSlice.reducer;
