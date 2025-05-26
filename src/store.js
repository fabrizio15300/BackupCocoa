import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./redux/productSlice";  // Importa il reducer dei prodotti

const store = configureStore({
  reducer: {
    products: productReducer, // Aggiunge il reducer dei prodotti allo store globale
  },
});

export default store;
