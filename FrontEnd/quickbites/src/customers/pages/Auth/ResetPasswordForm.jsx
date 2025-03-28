import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resetPassword } from "../../../State/Authentication/Action";

function ResetPasswordForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    if (password !== confirmedPassword) {
      setError("Passwords must match");
      return;
    }
    setError("");
    const data = { password, token };
    dispatch(resetPassword({ navigate, data }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full p-2 border border-gray-300 rounded"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </div>
      <div>
        <input
          type="password"
          name="confirmedPassword"
          placeholder="Confirm Password"
          className="w-full p-2 border border-gray-300 rounded"
          onChange={(e) => setConfirmedPassword(e.target.value)}
          value={confirmedPassword}
        />
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
      >
        Reset Password
      </button>
    </form>
  );
}

export default ResetPasswordForm;
