import React from "react";
import { Link } from "react-router-dom";
import RegistrationForm from "../components/RegistrationForm";

const RegistrationPage = () => {
   return (
    <div className=" min-h-screen flex items-center justify-center bg-gray-100">
         <div className=" mt-16 bg-white p-10 shadow-lg rounded-md w-96">
                   <RegistrationForm />
           <p className="text-center text-gray-600 mt-4">
             Hai già un account?
             <Link to="/LoginPage" className="text-amber-700 hover:underline">
                 Accedi
             </Link>
           </p>
         </div>
       </div>
   );
};//registrationPage

export default RegistrationPage;