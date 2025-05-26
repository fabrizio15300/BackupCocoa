import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { getToken, logoutUser } from "../services/authService";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  //controllo se l'utente ha il token e quindi è loggato
  const isLoggedIn = !!getToken();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full px-6 py-0 transition-all duration-300 z-50 ${
        isHomePage
          ? scrolled
            ? "bg-yellow-900 shadow-md"
            : "bg-transparent"
          : "bg-yellow-900 shadow-md"
      }`}
    >
      <div className="h-16 mx-auto flex items-center justify-between">

        {/*link*/}
        <div className="mx-auto flex items-center justify-between gap-20">
          <Link to="/">
            <img src="/CocoaLogo.png" alt="Logo" className="h-10" />
          </Link>
          <Link to="/" className="text-white italic text-base hover:text-yellow-200 font-semibold transition">
            Home
          </Link>
          <Link to="/products" className="text-white italic text-base hover:text-yellow-200 font-semibold transition">
            Prodotti
          </Link>
          <Link to="/about" className="text-white italic text-base hover:text-yellow-200 font-semibold transition">
            Chi siamo
          </Link>
          <Link to="/contact" className="text-white italic text-base hover:text-yellow-200 font-semibold transition">
            Contatti
          </Link>
        </div>

        {/*button logn e logout*/}
        <div className="flex items-center gap-4">
            {isLoggedIn ? (
                        <Link to="/ReservedArea" className="text-white italic text-base cursor-pointer hover:text-yellow-200 font-semibold transition">
                        Area Riservata
                        </Link>
                      ) : (
                        <p className="">

                        </p>
                      )}
          {/*se lè loggato alloma mostro logout, altrimenti accedi*/}
          {isLoggedIn ? (
            <h1
              onClick={() => {
                logoutUser();
                window.location.reload();
              }}
              className="text-white italic text-base hover:text-yellow-200 font-semibold cursor-pointer  transition"
            >
              Logout
            </h1>
          ) : (
            <Link
              to="/loginPage"
              className="text-white italic text-base hover:text-yellow-200 cursor-pointer font-semibold transition"
            >
              Accedi
            </Link>
          )}
          <Link to="/cart">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        className="fill-yellow-50 border-color-yellow-50 size-8 hover:fill-yellow-200"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                        />
                      </svg>
                    </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
