import api from "@/utils/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const checkUserReviewStatus = createAsyncThunk(
  "review/checkUserReviewStatus",
  async (productId) => {
    // has-reviewed/:productId
    const token = localStorage.getItem("token");
    const response = await api.get(`/review/has-reviewed/${productId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }
);

export const createReview = createAsyncThunk(
  "review/createReview",
  async (reviewData) => {
    const token = localStorage.getItem("token");
    const response = await api.post("/review", reviewData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  }
);

export const updateReview = createAsyncThunk(
  "review/update",
  async ({ id, reviewData }) => {
    const token = localStorage.getItem("token");
    const response = await api.put(`/review/${id}`, reviewData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  }
);

export const getProductReviewsBySlug = createAsyncThunk(
  "reviews/slug",
  async ({ slug, page = 1, limit = 10 }, { rejectWithValue }) => {
    try {
      const response = await api.get(
        `/review?slug=${slug}&page=${page}&limit=${limit}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  loading: false,
  error: null,
  pagination: null,
};

const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {
    setPagination: (state, action) => {
      state.pagination = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder;
  },
});

export const { setPagination } = reviewSlice.actions;
export default reviewSlice.reducer;
