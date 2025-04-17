import React, { useState } from "react";
import { useSelector } from "react-redux";
import he from "he";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import PayPalButton from "../components/PayPalButton";
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  const { items, totalPrice } = useSelector((state) => state.cart);
  const navigate = useNavigate();


  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
  });


  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  //id sandbox
  const PAYPAL_CLIENT_ID = "Ab0g8xRsOTFf_ft9NAn_t_7fecO_JJ_Rard10BINDBs-cmWxvVgIJfwmyueQrJm3pq5600at6J_cyMeg";

  //prendo le prime due cifro decimali
  const formattedTotalPrice = parseFloat(totalPrice).toFixed(2);

  return (
    <div className="container mx-auto mt-14 flex flex-col md:flex-row gap-10 py-10 px-6">

      {/*dati utente*/}
      <div className="w-full md:w-1/2 bg-white p-6 shadow-md rounded-md">
        <h2 className="text-2xl font-bold text-yellow-900 mb-4">Dati di Spedizione</h2>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700">Nome</label>
            <input
              type="text"
              name="firstName"
              value={userData.firstName}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Cognome</label>
            <input
              type="text"
              name="lastName"
              value={userData.lastName}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Indirizzo</label>
            <input
              type="text"
              name="address"
              value={userData.address}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
        </form>
      </div>

      {/*riepilogo*/}
      <div className="w-full md:w-1/2 bg-white p-6 shadow-md rounded-md">
        <h2 className="text-2xl font-bold text-yellow-900 mb-4">Riepilogo Ordine</h2>

        {items.length === 0 ? (
          <p className="text-gray-500">Il carrello è vuoto.</p>
        ) : (
          <ul>
            {items.map((item) => (
              <li key={item.id} className="flex justify-between border-b py-2">
                <span>{he.decode(item.name)}</span>
                <span>{item.quantity} x {parseFloat(item.salePrice || item.regularPrice).toFixed(2)}€</span>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-4 text-lg font-semibold">
          Totale: <span className="text-yellow-900">€ {formattedTotalPrice}</span>
        </div>


        <div className="mt-6">
          <PayPalScriptProvider options={{ "client-id": PAYPAL_CLIENT_ID, currency: "EUR" }}>
            <PayPalButton userData={userData} />
          </PayPalScriptProvider>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;