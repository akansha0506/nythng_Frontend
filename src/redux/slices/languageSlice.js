import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: "en",
};

const LanguageSlice = createSlice({
  name: "Language",
  initialState,
  reducers: {
    setLanguage: (state, action) => {
      state.value = action.payload;
    },
  },
});
export const { setLanguage } = LanguageSlice.actions;
export default LanguageSlice.reducer;
