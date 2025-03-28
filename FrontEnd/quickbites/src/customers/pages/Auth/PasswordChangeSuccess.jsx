import React from "react";
import { useNavigate } from "react-router-dom";

const PasswordChangeSuccess = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="w-full max-w-lg bg-green-100 text-green-800 p-4 rounded-md shadow-md mt-20 text-center">
        <p className="font-semibold">Password Successfully Changed!</p>
      </div>
      <button
        onClick={() => navigate("/account/login")}
        className="mt-5 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
      >
        Back To Login
      </button>
    </div>
  );
};

export default PasswordChangeSuccess;