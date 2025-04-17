import React from "react";
import { Link } from "react-router-dom";
import BestSellers from "../components/BestSellers";
import ScrollToTop from "../components/ScrollToTop";

const HomePage = () => {
  return (
    <div className="w-full bg-white">
      {/*Sezione hero*/}
      <div className="relative w-full h-screen">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/backGround.png')" }}
          >
          {/*Overlay*/}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/10"></div>
          </div>

         {/*Contenuto della Home*/}
         <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center">
          <h1 className="text-5xl italic md:text-5xl font-bold text-yellow-200 drop-shadow-lg tracking-wide">
           Il Tuo Cioccolato speciale

          </h1>

          <p className="text-lg mt-4 max-w-2xl italic">
            Scopri i nostri prodotti artigianali, realizzati con ingredienti di altissima qualità.
          </p>

          <button className="mt-6 hover:bg-amber-200 hover:text-stone-950 border border-solid border-white-50  text-white rounded-none font-bold py-3 bg-transparent px-8 rounded-md shadow-lg transition-all">
               <Link to= "/products">
                SCEGLI IL CIOCCOLATO
                </Link>
          </button>
        </div>

        {/*Svg*/}
            <div className="absolute bottom-0 left-0 w-full">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                <path fill="#ffffff" fill-opacity="1" d="M0,96L21.8,80C43.6,64,87,32,131,21.3C174.5,11,218,21,262,42.7C305.5,64,349,96,393,106.7C436.4,117,480,107,524,133.3C567.3,160,611,224,655,250.7C698.2,277,742,267,785,234.7C829.1,203,873,149,916,112C960,75,1004,53,1047,80C1090.9,107,1135,181,1178,208C1221.8,235,1265,213,1309,186.7C1352.7,160,1396,128,1418,112L1440,96L1440,320L1418.2,320C1396.4,320,1353,320,1309,320C1265.5,320,1222,320,1178,320C1134.5,320,1091,320,1047,320C1003.6,320,960,320,916,320C872.7,320,829,320,785,320C741.8,320,698,320,655,320C610.9,320,567,320,524,320C480,320,436,320,393,320C349.1,320,305,320,262,320C218.2,320,175,320,131,320C87.3,320,44,320,22,320L0,320Z"></path>
              </svg>
            </div>
        </div>

        <div
            className="bg-cover bg-center py-20  mt-0 px-2 relative z-10 flex justify-center items-center"
                style={{ backgroundImage: "url('/About.jpg')" }}
            >
            <div className="bg-white/80  p-10 max-w-4xl">
                <h1 className="text-3xl italic font-semibold text-left text-yellow-950 pb-4  border-amber-700">
                    About Us
                </h1>

              <p className="text-lg text-gray-700 leading-8 italic mt-4 tracking-wide leading-relaxed">
                Duis lacinia mauris ut sem suscipit cursus. Praesent tincidunt dolor eget pretium porttitor.
                Nam malesuada ipsum quis ligula porttitor placerat. Vestibulum ante ipsum primis
                in faucibus orci luctus et ultrices posuere cubilia curae; Morbi maximus auctor commodo.
              </p>

              <p className="text-lg text-gray-700 mt-4 leading-8 italic tracking-wide leading-relaxed">
                Praesent rutrum purus ligula, fringilla dignissim eros pellentesque sit amet.
                Integer vel odio rhoncus, dapibus felis ut, venenatis arcu. Donec dapibus varius ligula et malesuada.
              </p>

            </div>
        </div>

        <BestSellers />

        <h2 className="text-4xl mt-24 font-bold text-yellow-950 italic text-center">
          La nostra Special Gallery
        </h2>
        <p className="text-center text-lg text-gray-600 mt-6 italic">
          Dai un'occhiata alle nostre creazioni.
        </p>

        {/*Griglia immagini*/}
        <div className="grid grid-cols-3 gap-10 mt-16 ml-24 mr-24 mb-6
        ">
          <div className="group relative overflow-hidden rounded-none shadow-lg">
            <img
              src="/gallery1.png"
              alt="Gallery 1"
              className="w-full h-60 object-cover transform transition duration-300 group-hover:scale-125"
            />
          </div>

          <div className="group relative overflow-hidden rounded-none shadow-lg">
            <img
              src="/gallery2.png"
              alt="Gallery 2"
              className="w-full h-60 object-cover transform transition duration-300 group-hover:scale-125"
            />
          </div>

          <div className="group relative overflow-hidden rounded-none shadow-lg">
            <img
              src="/gallery3.png"
              alt="Gallery3"
              className="w-full h-60 object-cover transform transition duration-300 group-hover:scale-125"
            />
          </div>

          <div className="group relative overflow-hidden rounded-none shadow-lg">
            <img
              src="/gallery4.png"
              alt="Gallery 4"
              className="w-full h-60 object-cover transform transition duration-300 group-hover:scale-125"
            />
          </div>
          <div className=" col-span-2 group relative overflow-hidden rounded-none shadow-lg">
             <img
               src="/gallery5.png"
               alt="Gallery5"
               className="w-full h-60 object-cover transform transition duration-300 group-hover:scale-125"
             />
          </div>

          <div className="group relative overflow-hidden rounded-none shadow-lg">
              <img
                 src="/gallery6.png"
                 alt="Gallery6"
                 className="w-full h-60 object-cover transform transition duration-300 group-hover:scale-125"
              />
          </div>
          <div className="group relative overflow-hidden rounded-none shadow-lg">
               <img
                   src="/gallery7.png"
                   alt="Gallery7"
                   className="w-full h-60 object-cover transform transition duration-300 group-hover:scale-125"
               />
          </div>
          <div className="group relative overflow-hidden rounded-none shadow-lg">
               <img
                  src="/gallery8.png"
                  alt="Gallery8"
                  className="w-full h-60 object-cover transform transition duration-300 group-hover:scale-125 "
               />
          </div>
        </div>

         <div className="bg-white/80 ml-16 mr-24 p-10 max-w-4xl">
            <p className="text-xl text-gray-700 leading-8 tracking-wide italic mt-2 leading-relaxed">
               Duis lacinia mauris ut sem suscipit cursus. Praesent tincidunt dolor eget pretium porttitor.
               Nam malesuada ipsum quis ligula porttitor placerat. Vestibulum ante ipsum primis
               in faucibus orci luctus et ultrices posuere cubilia curae; Morbi maximus auctor commodo.
            </p>

            <p className="text-xl text-gray-700 mt-10 leading-8 tracking-wide italic leading-relaxed">
                  Praesent rutrum purus ligula, fringilla dignissim eros pellentesque sit amet.
                  Integer vel odio rhoncus, dapibus felis ut, venenatis arcu. Donec dapibus varius ligula et malesuada.
            </p>
               <button className="mt-10 mb-10 bg-yellow-700 text-white px-8 py-4 italic rounded-none hover:bg-yellow-800 transition">
                    <Link to="/">
                        Leggi Di Più
                    </Link>
               </button>

         </div>

      </div>
  );
};
export default HomePage;
