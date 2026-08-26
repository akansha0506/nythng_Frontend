import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const sendContactForm = createAsyncThunk(
  "contact/sendContactForm",
  async (contactDetails, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contactDetails),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const contactSlice = createSlice({
  name: "contact",
  initialState: {
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder;
  },
});

export const { setContactDetails } = contactSlice.actions;
export default contactSlice.reducer;
