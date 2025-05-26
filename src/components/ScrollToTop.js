import React, { useState, useEffect } from "react";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  //se scrollo più di 300 pixel allora appare il bottone
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false); //se torno nei primi 300 pixels sparisce
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  //creo la fuznione per tornare in alto
  const scrollToTop = () => {
    window.scrollTo({
      top:0, //ritorno allo zeresimo pixel
      behavior: "smooth"//rendo il passaggio fluido
    });
  };

  return (
    <div>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-yellow-700 text-white px-6 py-4 rounded-lg shadow-lg transition-opacity hover:bg-amber-600"
          >
          ↑
        </button>
      )}
    </div>
  );
};

export default ScrollToTop;