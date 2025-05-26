import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, updateQuantity, clearCart } from "../redux/cartSlice";
import { Link } from "react-router-dom";
import he from "he";

const CartPage = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  //se il carrello è vuoto mostro il messaggio e reindirizzo alla productpage
  if (cart.items.length === 0) {
    return (
      <div className="text-center py-20 mt-24">
        <h2 className="text-3xl font-semibold text-gray-900">Il tuo carrello è vuoto</h2>
        <Link to="/products" className="mt-4 inline-block text-yellow-900 font-bold hover:underline">
          Continua lo shopping ->
        </Link>
      </div>
    );
  }

  return (
    <div className="container mt-14 mx-auto px-6 py-10">
      <h1 className="text-3xl text-left italic font-bold text-yellow-900">Il Tuo Carrello</h1>

      <div className="mt-6 space-y-0">
        {cart.items.map((item) => (
          <div key={item.id} className="flex items-center justify-between bg-white p-4 shadow-md rounded-">
            {/*immagine*/}
            <img
              src={item.image?.sourceUrl || "/placeholder.png"}
              alt={item.image?.altText || "Immagine prodotto"}
              className="w-20 h-20 object-cover rounded-none"
            />

            {/*prezzo del product*/}
            <div className="flex-1 px-4">
              <h3 className="text-lg font-semibold text-left italic text-yellow-900">{he.decode(item.name)}</h3>
              <p className="text-gray-600 mt-4">
                {item.salePrice ? (
                  <>
                    <span className="line-through text-gray-500 mr-2">{he.decode(item.regularPrice)}</span>
                    <span className="text-amber-600 font-bold">{he.decode(item.salePrice)}</span>
                  </>
                ) : (
                  <span className="text-gray-900">{he.decode(item.regularPrice)}</span>
                )}
              </p>
            </div>

            {/*gestissco la quantità con i medoti di cartslice*/}
            <div className="flex items-center">
              <button
                className="px-2 py-1 bg-gray-300 hover:bg-yellow-700 text-gray-800 rounded-none"
                onClick={() => dispatch(updateQuantity({ id: item.id, quantity: Math.max(1, item.quantity - 1) }))}
              >
                -
              </button>
              <span className="px-4">{item.quantity}</span>
              <button
                className="px-2 py-1 bg-gray-300 hover:bg-yellow-700  text-gray-800 rounded-none"
                onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}
              >
                +
              </button>
            </div>

            {/*rimuovo il prodotto dal carrello in tutte le sue occorrenze*/}
            <button
              className="ml-4 px-4 py-2 bg-yellow-900 text-white rounded-none hover:bg-yellow-700 transition"
              onClick={() => dispatch(removeFromCart(item.id))}
            >
              Rimuovi
            </button>
          </div>
        ))}
      </div>

      {/*sapzio dedicato al checkout/all'importo totale e alla quantità dell'ordine*/}
      <div className="mt-8 bg-white p-6 shadow-md rounded-md">
        <h2 className="text-xl font-semibold italic mb-4 text-left text-yellow-900">Totale ({cart.totalQuantity} prodotti):</h2>
        <p className="text-2xl font-bold text-yellow-900">{cart.totalPrice.toFixed(2)} €</p>

        <button className="mt-4 bg-yellow-900 text-white px-6 py-3 rounded-none hover:bg-yellow-700 transition">
            <Link to ="/CheckoutPage">
                Procedi al Checkout
            </Link>
        </button>

        {/*tasto svuota*/}
        <button
          className="mt-4 ml-4 bg-gray-300 text-gray-800 px-6 py-3 rounded-none hover:bg-gray-400 transition"
          onClick={() => dispatch(clearCart())}
        >
          Svuota Carrello
        </button>
      </div>
    </div>
  );
};

export default CartPage;
