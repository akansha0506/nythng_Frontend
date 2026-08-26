import api from "@/utils/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchAllProducts = createAsyncThunk(
  "product/fetchAllProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/product?limit=15");
      console.log("responseresponse",response)
      return response.data;
    } catch (error) {
      console.error("Failed to fetch products:", error);
      return rejectWithValue(error.message);
    }
  }
);
export const getAllProductsForSearch = createAsyncThunk(
  "product/getAllProductsForSearch",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/product/all-data?limit=20");
      console.log("responseresponse",response)
      return response.data;
    } catch (error) {
      console.error("Failed to fetch products:", error);
      return rejectWithValue(error.message);
    }
  }
);

export const fetchProductBySlug = createAsyncThunk(
  "product/fetchProductBySlug",
  async (slug, { rejectWithValue }) => {
    try {
      const response = await api.get(`/product/${slug}`);
      console.log("responseresponse", response);
      return response.data.data;
    } catch (error) {
      console.error("Failed to fetch product by slug:", error);
      return rejectWithValue(error.message);
    }
  }
);
export const fetchAllCategoryProduct = createAsyncThunk(
  "product/fetchAllCategoryProduct",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/recommendations/homepage");
      console.log("responseresponse", response);
      return response.data;
    } catch (error) {
      console.error("Failed to fetch products:", error);
      return rejectWithValue(error.message);
    }
  }
);

export const fetchRecommendedProducts = createAsyncThunk(
  "product/fetchRecommendedProducts",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/recommendations/related/${productId}`);
      console.log("related response", response);
    
      return response.data.relatedProducts;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


const initialState = {
  allProducts: [],
  allCategoryProduct: [],
  filteredProducts: [],
  selectedProduct: [],
  recommendedProducts: [],
  allProductsForSearch: [],
  WishList: null,
  status: "idle",
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setFilteredProducts: (state, action) => {
      state.filteredProducts = action.payload;
    },
    resetProductState: (state) => {
      state.error = null;
      state.message = null;
    },
    filterProducts: (state, action) => {
      const { type } = action.payload;
      if (type === "all") {
        state.filteredProducts = state.allProducts;
      } else {
        state.filteredProducts = state.allProducts.data.filter(
          (product) => product.type === type
        );
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        console.log("action.payload......",action.payload)
        state.status = "succeeded";
        state.loading = false;
        state.allProducts = action.payload;
        state.filteredProducts = action.payload;
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.status = "failed";
        state.loading = false;
        state.error = action.error.message;
      })
          .addCase(getAllProductsForSearch.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(getAllProductsForSearch.fulfilled, (state, action) => {
        console.log("action.payload......",action.payload)
        state.status = "succeeded";
        state.loading = false;
        state.allProductsForSearch = action.payload;
      })
      .addCase(getAllProductsForSearch.rejected, (state, action) => {
        state.status = "failed";
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchProductBySlug.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(fetchProductBySlug.fulfilled, (state, action) => {
        console.log("payloaaddd", action.payload);
        state.status = "succeeded";
        state.loading = false;
        state.selectedProduct = action.payload;
      })
      .addCase(fetchAllCategoryProduct.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(fetchAllCategoryProduct.fulfilled, (state, action) => {
        console.log("catttttt", action.payload);
        state.status = "succeeded";
        state.loading = false;
        state.allCategoryProduct = action.payload;
        // state.filteredProducts = action.payload;
      })
      .addCase(fetchAllCategoryProduct.rejected, (state, action) => {
        state.status = "failed";
        state.loading = false;
        state.error = action.error.message;
      })
     .addCase(fetchRecommendedProducts.pending, (state) => {
            state.status = "loading";
        state.loading = true;
    })
     .addCase(fetchRecommendedProducts.fulfilled, (state, action) => {
      console.log("recommended payload", action.payload);
      state.status = "succeeded";
        state.loading = false;
      state.recommendedProducts = action.payload;
    })
    .addCase(fetchRecommendedProducts.rejected, (state, action) => {
         state.status = "failed";
        state.loading = false;
    })

} });

export const { setFilteredProducts, filterProducts, resetProductState } =
  productSlice.actions;
export default productSlice.reducer;
