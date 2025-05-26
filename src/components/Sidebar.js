import React from "react";
import { useQuery } from "@apollo/client";
import { GET_CATEGORIES } from "../queries/queries";

const Sidebar = ({ onCategorySelect }) => {
  const { loading, error, data } = useQuery(GET_CATEGORIES);

  if (loading) return <p className="text-center text-gray-500">Caricamento categorie...</p>;
  if (error) return <p className="text-center text-red-500">Errore nel caricamento delle categorie.</p>;

  console.log("Categorie ricevute:", data.productCategories.nodes);

  return (
    <aside className="w-1/4 bg-white p-6 shadow-sm rounded-md">
      <h2 className="text-xl italic text-left font-semibold text-amber-700 pb-2 border-b-2 border-amber-700">
        Categorie
      </h2>
      <ul className="mt-8 space-y-6">
        <li
          className="cursor-pointer text-yellow-950 hover:text-amber-600 flex justify-between"
          onClick={() => onCategorySelect(null)}
        >
          <span>Tutti i prodotti</span>
          <span className="text-xl font-bold">+</span>
        </li>
        {data.productCategories.nodes.map((category) => (
          <li
            key={category.id}
            className="cursor-pointer text-yellow-950 hover:text-amber-600 flex justify-between"
            onClick={() => {
              console.log("Categoria selezionata:",category.id);
              onCategorySelect(category.id);
            }}
          >
            <span className="pl-2 whitespace-nowrap">{category.name}</span>
            <span className="text-xl font-bold">+</span>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;