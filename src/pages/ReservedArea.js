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



/*
const ReservedArea=()=> {
    return(
        <div className="w-full bg-white">
                 <div className="container bg-stone-50 mx-auto flex gap-6 py-10 px-6">
                    <aside className="w-1/4 h-96 bg-white mt-14 p-6 shadow-sm rounded-none">
                        <p className="text-bold italic">
                            Qui ci saranno le informazioni personali di ogni utente loggato
                        </p>
                        <div className="text-bold italic mt-6 text-left mb-15 bg-stone-50">
                            Email:
                        </div>
                        <div className="text-bold italic mt-6 text-left mb-15 bg-stone-50">
                            Nome:
                        </div>
                        <div className="text-bold italic mt-6 text-left mb-15 bg-stone-50">
                            Cognome:
                       </div>
                       <button className="mt-8 items-left bg-yellow-900 text-white px-4 py-2 rounded-none hover:bg-yellow-700 transition">
                               Cambio Password
                       </button>
                    </aside>
                    <div className="w-3/4 h-96 bg-white mt-14 p-6 shadow-sm rounded-none">
                        <h1 className="text-bold italic text-left text-4xl text-amber-950">
                              Il tuo ordine
                        </h1>
                        <div className="grid grid-rows-3 mt-10 rounded-none ">
                            <h1 className="text-bold italic mt-2 text-left bg-stone-100 mb-15 ">
                                numero ordine
                            </h1>
                            <h1 className="text-bold italic mt-4 text-left bg-stone-100 mb-15 ">
                                totale ordine
                            </h1>
                            <h1 className="text-bold italic mt-4 text-left bg-stone-100 mb-15 ">
                                numero di tracciamento
                            </h1>
                        </div>
                    </div>
                </div>
            </div>
    );
};

export default ReservedArea;

*/


