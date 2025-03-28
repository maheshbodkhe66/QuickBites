import React from "react";

const OrderCard = ({ order, status }) => {
  return (
    <div className="flex justify-between items-center p-5 border border-gray-300 rounded-lg shadow-md">
      <div className="flex items-center space-x-5">
        <img className="h-16 w-16 rounded" src={order.food.images[0]} alt={order.food.name} />
        <div>
          <p className="font-semibold text-gray-900">{order.food.name}</p>
          <p className="text-gray-500">₹{order.food.price}</p>
        </div>
      </div>
      <div>
        <span className="px-4 py-2 bg-gray-300 text-gray-700 rounded cursor-not-allowed">{status}</span>
      </div>
    </div>
  );
};

export default OrderCard;
