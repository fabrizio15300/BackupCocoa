import { createSlice } from "@reduxjs/toolkit";

//stato iniziale del carrello
const initialState = {
  items: [],
  totalQuantity: 0,
  totalPrice: 0.0,
};

const parsePrice = (price) => {
  if (typeof price === "string") {
    return parseFloat(price.replace(",", "."));
  }
  return Number(price);
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {

    //aggiunta al carrello
    addToCart: (state, action) => {
      const product = action.payload;
      const price = parsePrice(product.salePrice || product.regularPrice);

      if (isNaN(price)) {
        console.error("Prezzo non valido:", product.salePrice, product.regularPrice);
        return;
      }

      const existingProduct = state.items.find((item) => item.id === product.id);

      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state.items.push({
                ...product,
                quantity: 1,
                name: product.name || "Prodotto", });
      }

      state.totalQuantity += 1;
      state.totalPrice += price;
    },

    //rimozione
    removeFromCart: (state, action) => {
      const productId = action.payload;
      const existingProduct = state.items.find((item) => item.id === productId);

      if (existingProduct) {
        const price = parsePrice(existingProduct.salePrice || existingProduct.regularPrice);


        state.totalQuantity -= existingProduct.quantity;
        state.totalPrice -= existingProduct.quantity * price;

        state.items = state.items.filter((item) => item.id !== productId);
      }
    },

    //quantità
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const product = state.items.find((item) => item.id === id);

      if (product) {
        const price = parsePrice(product.salePrice || product.regularPrice);
        if (isNaN(price)) return;

        const oldQuantity = product.quantity;
        const quantityDiff = quantity - oldQuantity;

        product.quantity = quantity;
        state.totalQuantity += quantityDiff;
        state.totalPrice += quantityDiff * price;
      }
    },

    //svuoto il carrello
    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0.0;
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
