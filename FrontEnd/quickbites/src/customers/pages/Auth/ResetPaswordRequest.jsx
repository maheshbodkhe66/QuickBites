import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetPasswordRequest } from "../../../State/Authentication/Action";

const ResetPasswordRequest = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { auth } = useSelector((store) => store);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.includes("@") || !email.includes(".")) {
      setError("Invalid email format");
      return;
    }
    setError("");
    dispatch(resetPasswordRequest(email));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-5">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
        <h1 className="text-2xl font-semibold">Forgot Password</h1>
        <form onSubmit={handleSubmit} className="space-y-5 mt-4">
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            className="w-full p-2 border border-gray-300 rounded"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          {error && <p className="text-red-500">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Send Reset Password Link
          </button>
        </form>
      </div>
      {auth.isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-white text-lg">Loading...</div>
        </div>
      )}
    </div>
  );
};

export default ResetPasswordRequest;
