import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice"; //importo solo addToCart, le altre solo aprendo il carrello
import he from "he";
import { Link } from "react-router-dom";

const ProductGrid = ({ products, sortOrder }) => {
  const dispatch = useDispatch();

  if (!products || products.length === 0) {
    return <p className="text-center text-gray-500">Nessun prodotto disponibile.</p>;
  }

  // Ordino i prodotti in base al criterio scelto
  let sortedProducts = [...products].sort((a, b) => {
    if (sortOrder === "asc") return a.name.localeCompare(b.name);
    if (sortOrder === "desc") return b.name.localeCompare(a.name);
    if (sortOrder ==="priceLowHigh") return parseFloat(a.regularPrice) - parseFloat(b.regularPrice);
    if (sortOrder ==="priceHighLow") return parseFloat(b.regularPrice) - parseFloat(a.regularPrice);
    return 0;
  });

  return (
    <div className="w-3/4 px-6 grid grid-cols-3 gap-6">
      {sortedProducts.map((product) => (
        <div key={product.id} className="bg-white shadow-md p-4 rounded-lg transition-transform hover:scale-105">
          {/*link alla productdetailspage*/}
          <Link to={`/product/${product.id}`}>
            <img
              src={product.image?.sourceUrl || "/placeholder.png"}
              alt={product.image?.altText || "Immagine prodotto"}
              className="w-full h-60 object-cover rounded-md cursor-pointer"
            />
          </Link>


          <h3 className="text-xl font-semibold mt-4 italic text-left">{he.decode(product.name)}</h3>

          {/*prezzo*/}
          <p className="text-gray-600 mt-2">
            {product.salePrice ? (
              <>
                <span className="line-through">{he.decode(product.regularPrice)}</span>{" "}
                <span className="text-lg text-amber-600 font-bold">{he.decode(product.salePrice)}</span>
              </>
            ) : (
              <span>{he.decode(product.regularPrice)}</span>
            )}
          </p>

          {/*aggiunta al carrello collegato al case di redux*/}
          <button
            onClick={() => dispatch(addToCart(product))} // Azione Redux
            className="mt-4 bg-yellow-900 text-white px-4 py-2 rounded-none hover:bg-yellow-700 transition"
          >
            Aggiungi al Carrello
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;
