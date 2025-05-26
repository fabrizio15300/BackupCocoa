import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { SEND_PASSWORD_RESET_EMAIL } from "../mutationPassword/mutation";

const ResetLinkPage = () => {
  const [email, setEmail] = useState("");
  const [sendEmail, { loading, error, data }] = useMutation(SEND_PASSWORD_RESET_EMAIL);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await sendEmail({ variables: { username: email } });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-xl font-bold italic mb-4 text-amber-950 text-center">E-mail di recupero</h2>
        <input
          type="email"
          placeholder="Inserisci la tua email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-yellow-900 text-white py-2 rounded hover:bg-yellow-700"
          disabled={loading}
        >
          Invia Link
        </button>
        {data && data.sendPasswordResetEmail?.success && (
          <p className="text-green-600 mt-2 text-sm text-center">
            Email inviata! Controlla la tua casella di posta
          </p>
        )}
        {error && <p className="text-red-600 mt-2 text-sm text-center">{error.message}</p>}
      </form>
    </div>
  );
};

export default ResetLinkPage;
