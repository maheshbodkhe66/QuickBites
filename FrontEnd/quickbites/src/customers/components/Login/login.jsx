import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../../State/Authentication/Action";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import Toastify styles

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state); // Get auth state
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await dispatch(loginUser({ data: formData, navigate }));

      // ✅ Check if the login was successful
      if (response && response.success) {
        toast.success("Login Successful! 🎉", { position: "top-right" });
      } else {
        throw new Error(auth.error || "Invalid credentials! ❌");
      }
    } catch (error) {
      toast.error(auth.error || "Invalid credentials! ❌", { position: "top-right" });
    }
  };

  return (
    <div className="max-w-xs mx-auto m-40 p-6 bg-white shadow-lg rounded-lg">

      <h2 className="text-center text-2xl font-semibold mb-4">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
        >
          Login
        </button>
      </form>
      <p className="text-center text-sm mt-4">
        Don't have an account?{" "}
        <button
          onClick={() => navigate("/account/register")}
          className="text-blue-500 hover:underline"
        >
          Register
        </button>
      </p>

      {/* Toast Notification Container */}
      <ToastContainer autoClose={3000} />
    </div>
  );
};

export default LoginForm;
