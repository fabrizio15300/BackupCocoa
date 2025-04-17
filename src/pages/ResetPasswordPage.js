import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { RESET_USER_PASSWORD } from "../mutationPassword/mutation";
import { useLocation } from "react-router-dom";

const ResetPasswordPage = () => {
  const query = new URLSearchParams(useLocation().search);
  const login = query.get("login");
  const key = query.get("key");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [resetPassword, { data, loading, error }] = useMutation(RESET_USER_PASSWORD);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) return alert("Le password non coincidono");

    await resetPassword({ variables: { key, login, password } });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-xl font-bold mb-4 text-center">Imposta nuova password</h2>
        <input
          type="password"
          placeholder="Nuova password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <input
          type="password"
          placeholder="Conferma password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-yellow-900 text-white py-2 rounded hover:bg-yellow-700"
          disabled={loading}
        >
          Reimposta Password
        </button>
        {data && data.resetUserPassword?.user && (
          <p className="text-green-600 mt-2 text-sm text-center">
            Password aggiornata! Puoi effettuare il login.
          </p>
        )}
        {error && <p className="text-red-600 mt-2 text-sm text-center">{error.message}</p>}
      </form>
    </div>
  );
};


export default ResetPasswordPage;
