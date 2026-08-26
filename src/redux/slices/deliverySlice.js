import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";

export const fetchEstimate = createAsyncThunk(
  "pincode/fetchEstimate",
  async (pin, { rejectWithValue }) => {
    try {
      const res = await api.get(
        `/estimate?delivery_postcode=${pin}`
      );

      const rawDate =
        res.data.etd || res.data.estimated_delivery_date;

      if (rawDate) {
        const date = new Date(rawDate);

        return date.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        });
      }

      return "Soon";
    } catch (err) {
      return rejectWithValue("Could not fetch estimate.");
    }
  }
);

const pincodeSlice = createSlice({
  name: "pincode",

  initialState: {
    value: "",
    estimate: "",
    loading: false,
    error: "",
  },

  reducers: {
    setPincode(state, action) {
      state.value = action.payload;

      // localStorage only exists in the browser
      if (typeof window !== "undefined") {
        localStorage.setItem(
          "userPincode",
          action.payload
        );
      }
    },

    resetPincodeState: (state) => {
      state.value = "";
      state.estimate = "";
      state.loading = false;
      state.error = "";

      if (typeof window !== "undefined") {
        localStorage.removeItem("userPincode");
      }
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchEstimate.pending, (state) => {
        state.loading = true;
        state.error = "";
        state.estimate = "";
      })

      .addCase(fetchEstimate.fulfilled, (state, action) => {
        state.loading = false;
        state.estimate = action.payload;
      })

      .addCase(fetchEstimate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  setPincode,
  resetPincodeState,
} = pincodeSlice.actions;

export default pincodeSlice.reducer;