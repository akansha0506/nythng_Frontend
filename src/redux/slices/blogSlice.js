import api from "@/utils/api";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchBlogs = createAsyncThunk(
  "blog/fetchBlogs",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/blogs");
      return response.data.data;
    } catch (error) {
      console.error("Failed to fetch blogs:", error);
      return rejectWithValue(error.message);
    }
  }
);

export const fetchBlogBySlug = createAsyncThunk(
  "blog/fetchBlogBySlug",
  async (slug, { rejectWithValue }) => {
    try {
      const response = await api.get(`/blogs/slug/${slug}`);
      return response.data.blog;
    } catch (error) {
      console.error("Failed to fetch blog by slug:", error);
      return rejectWithValue(error.message);
    }
  }
);

const blogSlice = createSlice({
  name: "blog",
  initialState: {
    blogs: [],
    selectedBlog: null,
    featuredBlog: null,
    loading: false,
    error: null,
  },
  reducers: {
    setSelectedBlog: (state, action) => {
      state.selectedBlog = action.payload;
    },
    setFeaturedBlog: (state, action) => {
      state.featuredBlog = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.loading = false;
        const featured = action.payload.find((blog) => blog.featured);
        const nonFeaturedBlogs = action.payload.filter(
          (blog) => !blog.featured
        );
        state.blogs = nonFeaturedBlogs || [];
        state.featuredBlog = featured || null;
        state.error = null;
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchBlogBySlug.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBlogBySlug.fulfilled, (state, action) => {
        state.loading = false;
        console.log("Fetched blog by slug:", action.payload);
        state.selectedBlog = action.payload;
        state.error = null;
      })
      .addCase(fetchBlogBySlug.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setSelectedBlog, setFeaturedBlog } = blogSlice.actions;
export default blogSlice.reducer;
