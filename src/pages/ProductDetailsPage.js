import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductDetails } from "../redux/productSlice";
import { useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar"; //stessa sidebar della product page
import he from "he";

const ProductDetailsPage = () => {
  const { id } = useParams(); //id del prodotto dall'URL
  const dispatch = useDispatch();
  const { productDetails, loading, error } = useSelector((state) => state.products);
  const [selectedCategory, setSelectedCategory] = useState(null); // Stato per la sidebar

  useEffect(() => {
    dispatch(fetchProductDetails(id)); //dettagli tramite la fetch sull'id, in productslice
  }, [dispatch, id]);

  if (loading) return <p className="text-center text-gray-500">Caricamento...</p>;
  if (error) return <p className="text-center text-red-500">Errore: {error}</p>;
  if (!productDetails) return <p className="text-center text-gray-500">Prodotto non trovato.</p>;

  return (
    <div className="w-full">
      {/*hero section come in productpage*/}
      <div className="h-96 bg-black flex flex-col items-center justify-center text-6xl italic text-white">
        <h1 className="text-4xl text-stone-50 italic ">Collezione</h1>
        <p className="text-lg">
          <a href="/" className="hover:text-amber-600">Home</a> / <span className="text-stone-50">aaaaaa</span>
        </p>
      </div>

      <div className="container mx-auto flex gap-6 py-10 px-6">
        {/*Sidebar*/}
        <Sidebar onCategorySelect={setSelectedCategory} />

        {/*dettagli del prodotto*/}
        <div className="w-3/4 bg-white p-8 shadow-lg rounded-md">
          <div className="flex flex-col md:flex-row gap-10">

            <div className="w-full md:w-1/2">
              <img
                src={productDetails.image?.sourceUrl || "/placeholder.png"}
                alt={productDetails.image?.altText || "Immagine prodotto"}
                className="w-full h-96 object-cover rounded-lg shadow-md"
              />

              {/*miniature delle immagini gallery */}
              <div className="flex mt-4 space-x-2">
                {productDetails.galleryImages?.nodes.map((img, index) => (
                  <img
                    key={index}
                    src={img.sourceUrl}
                    alt="Gallery"
                    className="w-20 h-20 object-cover rounded-md cursor-pointer hover:scale-110 transition-transform"
                  />
                ))}
              </div>
            </div>

            {/*info prodotto*/}
            <div className="w-full md:w-1/2">
              <h1 className="text-3xl font-bold text-left text-yellow-950">{he.decode(productDetails.name)}</h1>
              <p className="text-gray-600 mt-2">{he.decode(productDetails.shortDescription)}</p>

              {/*prezzo regulare o scontato*/}
              <p className="text-xl font-semibold mt-4">
                {productDetails.salePrice ? (
                  <>
                    <span className="line-through text-gray-500 mr-2">{he.decode(productDetails.regularPrice)}</span>
                    <span className="text-amber-600">{he.decode(productDetails.salePrice)}</span>
                  </>
                ) : (
                  <span>{he.decode(productDetails.regularPrice)}</span>
                )}
              </p>

              {/*aggiunta al carrello*/}
              <button className="mt-6 bg-yellow-900 text-white px-6 py-3 rounded-md hover:bg-yellow-700 transition">
                Aggiungi al carrello
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;