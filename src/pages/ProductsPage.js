import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts, filterByCategory } from "../redux/productSlice";
import ProductGrid from "../components/ProductGrid";
import Sidebar from "../components/Sidebar";
import FilterBar from "../components/FilterBar";

const ProductsPage = () => {
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [sortOrder,setSortOrder] = useState("");
  const products = useSelector((state) => state.products.filteredItems);

  useEffect(() => {
    dispatch(fetchAllProducts()); //carico tutti i prodotti all'avvio
  }, [dispatch]);

  useEffect(() => {
    dispatch(filterByCategory(selectedCategory)); //applico il filtro per le categorie
  }, [dispatch, selectedCategory]);

  return (
    <div className="w-full">

      <div className="h-96 bg-black flex flex-col items-center justify-center text-6xl italic text-white">
        <h1 className="text-4xl italic text-stone-50">Collezione</h1>
        <p className="text-lg">
          <a href="/" className="hover:text-amber-600">Home</a> / Prodotti
        </p>
      </div>

      <div className="container bg-stone-50 mx-auto flex gap-6 py-10 px-6">
        {/*sidebar*/}
        <Sidebar onCategorySelect={setSelectedCategory} />

        <div className="w-3/4 w-full">
          {/*barra filtri sopra la grid*/}
          <FilterBar
            onSortChange={setSortOrder}
          />
          {/*grid dei prodotti*/}
          <ProductGrid
            products={products}
            sortOrder={sortOrder}

          />
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;