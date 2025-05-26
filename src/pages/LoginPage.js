import React from "react";
import LoginForm from "../components/LoginForm";
import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
    <div className=" min-h-screen flex items-center justify-center bg-gray-100">
      <div className=" mt-16 bg-white p-10 shadow-lg rounded-md w-96">
                <LoginForm />
        <p className="text-center text-gray-600 mt-4">
          Non hai un account?
          <Link to="/RegistrationPage" className="text-amber-700 hover:underline">
              Registrati
          </Link>
        </p>
      </div>
    </div>
  );
};//LoginPage

export default LoginPage;