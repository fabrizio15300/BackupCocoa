import React, { useEffect, useState } from "react";
import { fetchCurrentUser } from "../services/authService";
import OrderGrid from "../components/OrderGrid";


const ReservedArea = () => {
    const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const userData = await fetchCurrentUser();
      setUser(userData);
    };
    getUser();
  }, []);

  return (
    <div className="w-full bg-white">
      <div className="container bg-stone-50 mx-auto flex gap-6 py-10 px-6">
        <aside className="w-1/4 h-96 bg-white mt-14 p-6 shadow-sm rounded-none">
          <p className="text-4xl mt-6 font-bold text-yellow-950 italic text-left">
            Profilo
          </p>
          <div className="text-bold italic mt-6 text-left mb-15 bg-stone-50">
            Username: {user?.username || "caricamento..."}
          </div>
          <div className="text-bold italic mt-6 text-left mb-15 bg-stone-50">
            Email: {user?.email || "caricamento..."}
          </div>
          <div className="text-bold italic mt-6 text-left mb-15 bg-stone-50">
            Nome: {user?.name || "caricamento..."}
          </div>
          <button className="mt-8 items-left bg-yellow-900 text-white px-4 py-2 rounded-none hover:bg-yellow-700 transition">
            Cambio Password
          </button>
        </aside>

        <div className="w-3/4 h-96 bg-white mt-14 p-6 shadow-sm rounded-none">
            <OrderGrid />
        </div>

      </div>
    </div>
  );
};

export default ReservedArea;


