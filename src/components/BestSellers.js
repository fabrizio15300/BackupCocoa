import React from "react";
import { useQuery } from "@apollo/client";
import { GET_BEST_SELLERS } from "../queries/queries";
import he from "he";
import { addToCart } from "../redux/cartSlice";
import { useDispatch } from "react-redux";


const BestSellers =()=> {
  const { loading, error, data } = useQuery(GET_BEST_SELLERS);
  const dispatch = useDispatch();

  if (loading) return <p className="text-center text-gray-500">Caricamento...</p>;
  if (error) return <p className="text-center text-red-500">Errore: {error.message}</p>;

  return (
    <div className="mt-20 px-6">
      <h2 className="text-4xl font-bold text-yellow-950 italic text-center">
            Best Sellers
      </h2>
      <p className="text-center text-lg text-gray-600 italic mt-6">
        Scopri i migliori prodotti in offerta!
      </p>

      {/*Griglia dei prodotti*/}
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-1 max-w-7xl mx-auto">
        {data.products.nodes.map((product)=>(
          <div key={product.id} className="group relative bg-white shadow-none rounded-none p-6">
            <img
              src={product.image?.sourceUrl ||"/placeholder.png"}
              alt={product.image?.altText || "Immagine prodotto"}
              className="w-full h-60 object-cover rounded-none transform transition duration-300 group-hover:scale-105"
            />

            <h3 className="text-lg italic font-semibold text-left text-yellow-800 mt-6">{product.name}</h3>
            <p className="text-yellow-700 text-xl mt-4 font-bold">
              {product.salePrice ? (
                <>
                  <span className="line-through text-gray-500 mr-2">{he.decode(product.regularPrice)}</span>
                  <span className="text-yellow-700">{he.decode(product.salePrice)}</span>
                </>
                    ):(`{he.decode(product.regularPrice)}€`)}
            </p>
            <button onClick={() => dispatch(addToCart(product))}
            className="mt-6 mb-10 bg-yellow-700 text-white px-2 py-1 italic rounded-none hover:bg-yellow-800 transition"
            >
              Aggiungi al carrello
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BestSellers;