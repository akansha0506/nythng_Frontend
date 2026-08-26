import { configureStore, combineReducers } from "@reduxjs/toolkit";

import cartReducer from "./slices/cartSlice";
import LanguageReducer from "./slices/languageSlice";
import blogReducer from "./slices/blogSlice";
import productReducer from "./slices/productSlice";
import authReducer from "./slices/authSlice";
import wishListReducer from "./slices/wishlistSlice";
import addressReducer from "./slices/addressSlice";
import pincodeReducer from "./slices/deliverySlice";
import orderReducer from "./slices/orderSlice";
import reviewReducer from "./slices/reviewSlice";

// Root reducer
const appReducer = combineReducers({
  cart: cartReducer,
  language: LanguageReducer,
  blogs: blogReducer,
  product: productReducer,
  auth: authReducer,
  wishlist: wishListReducer,
  address: addressReducer,
  pincode: pincodeReducer,
  order: orderReducer,
  review: reviewReducer,
});

export const resetState = () => ({
  type: "RESET_STATE",
});

const rootReducer = (state, action) => {
  if (action.type === "RESET_STATE") {
    if (!action.payload) {
      // Full state reset
      state = undefined;
    } else {
      // Selective slice reset
      const newState = { ...state };

      for (const slice of action.payload) {
        newState[slice] = undefined;
      }

      state = newState;
    }
  }

  return appReducer(state, action);
};

// Redux store
export const store = configureStore({
  reducer: rootReducer,
});