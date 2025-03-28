import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearCartAction } from "../../../State/Customers/Cart/cart.action";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearCartAction());
  }, [dispatch]);

  return (
    <div className="min-h-screen flex items-center justify-center px-5">
      <div className="w-full lg:w-1/3 bg-white p-6 rounded-md shadow-lg text-center">
        <div className="text-green-600 text-6xl mb-4">✅</div>
        <h1 className="text-2xl font-semibold">Order Success!</h1>
        <p className="py-3 text-gray-500">
          Thank you for choosing our restaurant! We appreciate your order.
        </p>
        <p className="py-2 text-gray-700 text-lg">Have A Great Day!</p>
        <button
          className="mt-5 bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
          onClick={() => navigate("/")}
        >
          Go To Home
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
