import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import client from "../apolloClient";
import { GET_ALL_PRODUCTS, GET_PRODUCT_DETAILS } from "../queries/queries";

//recupero i prodotti da WooCommerce
export const fetchAllProducts = createAsyncThunk(
  "products/fetchAllProducts",
  async (_, { rejectWithValue }) => {
    try {
      const { data } =await client.query({ query: GET_ALL_PRODUCTS });
      return data.products.nodes; //restituisco l'insieme dei prodotti
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

//dettagli del singolo
export const fetchProductDetails = createAsyncThunk(
  "products/fetchProductDetails",
  async (productId, { rejectWithValue }) => {
    try {
      const { data } = await client.query({
        query: GET_PRODUCT_DETAILS,
        variables: { id: productId },
      });
      return data.product; //restituisco il prodotto
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    items: [], //tutti i prodotti
    filteredItems: [], //prodotti filtrati per categoria
    productDetails: null, //prodotto selezionato, inizialmente null
    loading: false,
    error: null,
  },
  reducers: {
    //filtro i prodotti per categoria
    filterByCategory: (state, action) => {
      if (action.payload) {
        state.filteredItems = state.items.filter((product) =>
          product.productCategories.nodes.some((cat) => cat.id === action.payload)
        );
      } else {
        state.filteredItems = state.items;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      //carico tutti i prodotti inizialmente
      .addCase(fetchAllProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.filteredItems = action.payload;
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //caricamento dettagli prodotto
      .addCase(fetchProductDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.productDetails = null;
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.productDetails = action.payload;
      })
      .addCase(fetchProductDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

//action e reducer
export const { filterByCategory } = productSlice.actions;
export default productSlice.reducer;
