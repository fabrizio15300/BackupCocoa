import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocation } from 'react-router';

const SubBar = () => {
  return (
    <div className="w-full bg-yellow-900 mt-14 text-white py-10">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/*Logo*/}
        <div>
            <Link to="/">
                <img src="/CocoaLogo.png" alt="Logo" className="h-16 mb-4"/>
            </Link>
          <p className="text-sm">Via Francesco Cilea</p>
          <p className="text-sm mt-6">+39 0000-0000-000</p>
          <p className="text-sm mt-6">itaca@itacatech.it</p>

        </div>
        <div>
          <h3 className="text-xl text-left font-semibold italic text-yellow-200 border-gray-400 pb-2">Supporto</h3>
          <ul className="mt-6 space-y-2 text-sm">
            <li><p className="mt-6 cursor-pointer hover:text-yellow-200">Spedizioni</p></li>
            <li><p className="mt-6 cursor-pointer hover:text-yellow-200">Contatti</p></li>
            <li><p className="mt-6 cursor-pointer hover:text-yellow-200">Carriere</p></li>
            <li><p className="mt-6 cursor-pointer hover:text-yellow-200">Portfolio</p></li>
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-semibold italic text-left text-yellow-200 border-gray-400 pb-2">Informazioni</h3>
          <ul className="mt-6 space-y-2 text-sm">
            <li><p className=" mt-6 cursor-pointer hover:text-yellow-200">FAQ</p></li>
            <li><p className="mt-6 cursor-pointer hover:text-yellow-200">Ricerca Avanzata</p></li>
            <li><p className="mt-6 cursor-pointer hover:text-yellow-200">Negozio</p></li>
            <li><p className="mt-6 cursor-pointer hover:text-yellow-200">Ordini</p></li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold italic text-left text-yellow-200 border-gray-400 pb-2">Aiuto</h3>
          <ul className="mt-6 space-y-2 text-sm">
            <li><p className=" mt-6 cursor-pointer hover:text-yellow-200">Cerca</p></li>
            <li><p className=" mt-6 cursor-pointer hover:text-yellow-200">Aiuto</p></li>
            <li><p className="mt-6 cursor-pointer hover:text-yellow-200">Privacy</p></li>
            <li><p className="mt-6 cursor-pointer hover:text-yellow-200">Spedizioni</p></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SubBar;