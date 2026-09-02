// const { createSlice } = require("@reduxjs/toolkit")

import api from "@/utils/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// format cart data for update when login

function addToCartLocal(product, sku, quantity = 1) {
  const cartKey = "guestCart";
  let cart = JSON.parse(localStorage.getItem(cartKey)) || {
    totalBeforeDiscount: 0,
    totalAfterDiscount: 0,
    products: [],
  };
  const cartProducts = cart.products || [];

  const filteredSize = product.sizes.find((s) => s.sku === sku);
  if (!filteredSize) {
    console.log("Size not found");
    return;
  }

  const existingProduct = cartProducts.find(
    (p) => p.size.sku === filteredSize.sku
  );
  if (existingProduct) {
    existingProduct.quantity += quantity;
  } else {
    const productId = product.id || product._id;
    const heading = product.heading || product.name;
    const subheading = product.subheading || "";

    cart.products.push({
      productId: productId,
      heading,
      subheading,
      quantity: quantity,
      size: filteredSize,
    });
  }
  cart.totalBeforeDiscount = cart.products.reduce((total, p) => {
    return total + (p?.size?.price?.sellingPrice || 0) * p.quantity;
  }, 0);
  cart.totalAfterDiscount = cart.totalBeforeDiscount;
  localStorage.setItem(cartKey, JSON.stringify(cart));
}
function removeCartFromLocal(productId, sku) {
  const cartKey = "guestCart";
  let cart = JSON.parse(localStorage.getItem(cartKey));

  if (!cart) return;
  // console.log("cartttbtt", productId, sku);
  console.log("cart products", cart.products);

  cart.products = cart.products.filter(
    (p) => p.productId !== productId || p.size.sku !== sku
  );

  cart.totalBeforeDiscount = cart.products.reduce((total, p) => {
    return total + (p?.size?.price?.sellingPrice || 0) * p.quantity;
  }, 0);
  cart.totalAfterDiscount = cart.totalBeforeDiscount;
  localStorage.setItem(cartKey, JSON.stringify(cart));
}
function updateCartQuantityLocal(id, change = 1, sku) {
  const cartKey = "guestCart";
  let cart = JSON.parse(localStorage.getItem(cartKey));

  if (!cart) return;
  console.log("carttttt", cart);

  const productInCart = cart.products.find(
    (p) => p.productId === id && p.size.sku === sku
  );

  if (productInCart) {
    productInCart.quantity += change;
    if (productInCart.quantity <= 0) {
      cart.products = cart.products.filter(
        (p) => p.productId !== id && p.size.sku !== sku
      );
    }

    cart.totalBeforeDiscount = cart.products.reduce((total, p) => {
      return total + (p?.size?.price?.sellingPrice || 0) * p.quantity;
    }, 0);
    cart.totalAfterDiscount = cart.totalBeforeDiscount;
    localStorage.setItem(cartKey, JSON.stringify(cart));
  }
}

function formatCartDataForServer(cart) {
  const formattedProducts = cart.products.map((p) => ({
    productId: p.productId,
    quantity: p.quantity,
    sku: p.size.sku,
  }));
  return formattedProducts;
}
function formatCartDataForAllCartServer(cart) {
  const formattedProducts = cart.map((p) => ({
    productId: p._id,
    quantity: 1,
    sku: p.sizes?.[0]?.sku, 
  }));
  return formattedProducts;
}
export const getCart = createAsyncThunk(
  "cart/getCart",
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem("token");

    if (!token) {
      const cart = JSON.parse(localStorage.getItem("guestCart"));
      return {
        local: true,
        cart: cart || {
          totalBeforeDiscount: 0,
          totalAfterDiscount: 0,
          products: [],
        },
      };
    }

    try {
      const res = await api.get("/cart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res && res.data.success) {
        return {
          local: false,
          cart: res.data.cart,
        };
      }
    } catch (error) {
      console.log(error);
      return rejectWithValue("Failed to get cart.");
    }
  }
);

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (
    { product, quantity = 1, sku, openside = true },
    { rejectWithValue }
  ) => {
    console.log("adding to cart: ", product);
    const token = localStorage.getItem("token");

    if (!token) {
      // If no token, use local storage
      addToCartLocal(product, sku, quantity);
      return {
        local: true,
        openside,
        cart: JSON.parse(localStorage.getItem("guestCart")),
      };
    }

    try {
      const res = await api.post(
        "/cart",
        {
          productId: product._id || product.id || product,
          quantity,
          sku,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res && res.data.success) {
        return {
          local: false,
          openside,
          cart: res.data.cart,
        };
      }
    } catch (error) {
      console.log(error);
      return rejectWithValue("Failed to add item to cart.");
    }
  }
);

export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async ({ productId, sku }, { rejectWithValue }) => {
    const token = localStorage.getItem("token");

    if (!productId && !sku) {
      return rejectWithValue("Product ID and SKU are required.");
    }

    if (!token) {
      console.log(productId, sku);
      removeCartFromLocal(productId, sku);
      return {
        local: true,
        cart: JSON.parse(localStorage.getItem("guestCart")),
      };
    }

    try {
      const res = await api.put(
        `/cart`,
        {
          productId,
          sku,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res && res.data.success) {
        return {
          local: false,
          cart: res.data.cart,
        };
      }
    } catch (error) {
      console.log(error);
      return rejectWithValue("Failed to remove item from cart.");
    }
  }
);

export const changeQuantity = createAsyncThunk(
  "cart/changeQuantity",
  async ({ productId, sku, change }, { rejectWithValue }) => {
    console.log("quantityyy", productId, sku, change);
    const token = localStorage.getItem("token");
    if (!token) {
      updateCartQuantityLocal(productId, change, sku);
      return {
        local: true,
        cart: JSON.parse(localStorage.getItem("guestCart")),
      };
    }
    try {
      const res = await api.patch(
        `/cart`,
        {
          productId,
          sku,
          change,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res && res.data.success) {
        return {
          local: false,
          cart: res.data.cart,
        };
      }
    } catch (error) {
      console.log(error);
      return rejectWithValue("Failed to change item quantity.");
    }
  }
);

// update cart when login
export const updateCartOnLogin = createAsyncThunk(
  "cart/updateCartOnLogin",
  async (_, { rejectWithValue }) => {
    console.log("update cart called")
    try {
      const cartRaw = localStorage.getItem("guestCart");
      let cart;
      try {
        cart = JSON.parse(cartRaw);
        console.log("cartcart",cart)
      } catch (err) {
        console.error("Failed to parse guestCart from localStorage:", err);
        return rejectWithValue("Invalid cart data in localStorage");
      }

      const formattedCart = formatCartDataForServer(cart || []);
      console.log("formattedCart",formattedCart)
      try {
        const token = localStorage.getItem("token");
        const res = await api.patch(
          "/cart/update-cart",
          { products: formattedCart },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("resresres", res);
        if (res && res.data.success) {
          localStorage.removeItem("guestCart");
          return {
            local: false,
            cart: res.data.cart,
          };
        }
      } catch (error) {
        console.error("Failed to update cart on login:", error);
        return rejectWithValue("Failed to update cart on login");
      }
    } catch (error) {
      return rejectWithValue(error.message || "Failed to update cart on login");
    }
  }
);
export const addAllToCart = createAsyncThunk(
  "cart/addAllToCart",
  async ({ products, openside = true }, { rejectWithValue }) => {

    const token = localStorage.getItem("token");

    if (!token) {
      // add to guest cart
      addAllToCartLocal(products);
      return {
        local: true,
        openside, // ✅ now sidebar flag included
        cart: JSON.parse(localStorage.getItem("guestCart")),
      };
    }

    try {
      const formattedCart = formatCartDataForAllCartServer(products || []);

      const res = await api.patch(
        "/cart/update-cart",
        { products: formattedCart },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res && res.data.success) {
        localStorage.removeItem("guestCart");
        return {
          local: false,
          openside,
          cart: res.data.cart,
        };
      } else {
        return rejectWithValue("API did not return success");
      }
    } catch (error) {
      console.error("Failed to update cart:", error);
      return rejectWithValue("Failed to update cart");
    }
  }
);


// ✅ New helper to add all products locally
function addAllToCartLocal(products, quantity = 1) {
  const cartKey = "guestCart";
  let cart =
    JSON.parse(localStorage.getItem(cartKey)) || {
      totalBeforeDiscount: 0,
      totalAfterDiscount: 0,
      products: [],
    };

 products.forEach((product) => {
  if (!product?.sizes || product.sizes.length === 0) {
    console.warn("⚠️ No sizes found for product:", product);
    return; // skip this product safely
  }

  const sku = product.sizes[0].sku;
  const filteredSize = product.sizes.find((s) => s.sku === sku);
  if (!filteredSize) return;

  const existingProduct = cart.products.find(
    (p) => p.size.sku === filteredSize.sku
  );

  if (existingProduct) {
    existingProduct.quantity += quantity;
  } else {
    cart.products.push({
      productId: product.id || product._id,
      heading: product.heading || product.name,
      subheading: product.subheading || "",
      quantity,
      size: filteredSize,
    });
  }
});

  cart.totalBeforeDiscount = cart.products.reduce(
    (total, p) => total + (p.size.price?.sellingPrice || 0) * p.quantity,
    0
  );
  cart.totalAfterDiscount = cart.totalBeforeDiscount;

  localStorage.setItem(cartKey, JSON.stringify(cart));
}


// apply coupon
export const applyCoupon = createAsyncThunk(
  "cart/applyCoupon",
  async (code, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        return rejectWithValue("User not authenticated");
      }

      const res = await api.get(`/coupon/apply/${code}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res && res.data.success) {
        return {
          local: false,
          cart: res.data.cart,
        };
      }
    } catch (error) {
      console.error(
        "Failed to apply coupon:",
        error.response?.data?.message || error.message
      );
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to apply coupon"
      );
    }
  }
);

// get Recommended coupon
export const getRecommendedCoupon = createAsyncThunk(
  "cart/getRecommendedCoupon",
  async (cartTotal, { rejectWithValue }) => {
    console.log("cartTotalcartTotal",cartTotal)
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        return rejectWithValue("User not authenticated");
      }

      const res = await api.post(`/recommendations/coupons`, 
        { cartTotal },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      if (res && res.data.success) {
        console.log("resres",res)
        return res.data.coupons
        // return {
        //   local: false,
        //   // coupons: res.data.cart,
        // };
      }
    } catch (error) {
      console.error(
        "Failed to apply coupon:",
        error.response?.data?.message || error.message
      );
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to apply coupon"
      );
    }
  }
);
// remove coupon
export const removeCoupon = createAsyncThunk(
  "/coupon/remove",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        return rejectWithValue("User not authenticated");
      }

      const res = await api.get("/coupon/remove", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res && res.data.success) {
        return {
          local: false,

          cart: res.data.cart,
        };
      }
    } catch (error) {
      console.error("Failed to remove coupon:", error);
      return rejectWithValue("Failed to remove coupon");
    }
  }
);

const extractProductIds = (cart) => {
  if (!cart || !cart.products) return [];
  return cart.products.map((item) => item.productId._id || item.productId);
};

// recommend product according to cart items
export const recommendProducts = createAsyncThunk(
  "cart/recommendProducts",
  async (_, { rejectWithValue, getState }) => {
    try {
      const cartProductIds = extractProductIds(getState().cart.cart);
      // if (cartProductIds.length === 0) {
      //   return {
      //     local: localStorage.getItem("token") ? false : true,
      //     recommendedProducts: [],
      //   };
      // }
      // console.log("cartProductIds", cartProductIds);
      const res = await api.post("/recommendations/cart", {
        cartProductIds,
      });
      if (res && res.data.success) {
        return {
          local: localStorage.getItem("token") ? false : true,
          recommendedProducts: res.data.recommendations || [],
        };
      }
    } catch (error) {
      console.error("Failed to fetch recommended products:", error);
      return rejectWithValue("Failed to fetch recommended products");
    }
  }
);

//initial values for cart
const initialState = {
  cart: null,
  recommendedProducts: [],
  recommendedCoupon: [],
  coupons: [],
  isSidebarOpen: false,
  loading: false,
  error: null,
  coupon: null,
};

//functions for cart
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    toggleSidebar: (state, action) => {
      state.isSidebarOpen = action.payload;
    },
    setCart: (state, action) => {
      state.cart = action.payload;
    },
    resetCartState: (state) => {
      state.cart = null;
      state.isSidebarOpen = false;
      state.loading = false;
      state.error = null;
      state.coupon = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // get cart
      .addCase(getCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload.cart;
      })
      .addCase(getCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //add-to-cart
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload.cart;
        state.isSidebarOpen = action.payload.openside;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })

      //remove-from-cart
      .addCase(removeFromCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {

        state.loading = false;
        state.cart = action.payload.cart;
        state.isGuest = action.payload.local;
      })
      .addCase(removeFromCart.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to remove item from cart.";
      })

      // Change Quantity
      .addCase(changeQuantity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(changeQuantity.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload.cart;
        state.isGuest = action.payload.local;
      })
      .addCase(changeQuantity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateCartOnLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCartOnLogin.fulfilled, (state, action) => {
        console.log("action.payload", action.payload);
        state.loading = false;
        state.cart = action.payload.cart;
        state.isGuest = action.payload.local;
      })
      .addCase(updateCartOnLogin.rejected, (state, action) => {
         console.log("action.payloadFailedd", action.payload);
        state.loading = false;
        state.error = action.payload;
      })
        .addCase(addAllToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
   .addCase(addAllToCart.fulfilled, (state, action) => {
  state.loading = false;
  state.cart = action.payload.cart;
  state.isGuest = action.payload.local;
  state.isSidebarOpen = action.payload.openside; 
})

      .addCase(addAllToCart.rejected, (state, action) => {    
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(applyCoupon.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(applyCoupon.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload.cart;
        state.isGuest = action.payload.local;
      })
      .addCase(applyCoupon.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getRecommendedCoupon.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getRecommendedCoupon.fulfilled, (state, action) => {
        console.log("payloaddddddddd",action.payload)
        state.loading = false;
        state.coupons = action.payload;
        state.isGuest = action.payload.local;
      })
      .addCase(getRecommendedCoupon.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(removeCoupon.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeCoupon.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload.cart;
        state.isGuest = action.payload.local;
      })
      .addCase(removeCoupon.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // recommend products
      .addCase(recommendProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(recommendProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.recommendedProducts = action.payload.recommendedProducts;
        state.isGuest = action.payload.local;
      })
      .addCase(recommendProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export const { toggleSidebar, setCart, resetCartState } = cartSlice.actions;

export default cartSlice.reducer;
