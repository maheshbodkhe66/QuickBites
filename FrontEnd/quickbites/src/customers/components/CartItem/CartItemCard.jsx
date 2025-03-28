import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  removeCartItem,
  updateCartItem,
} from "../../../State/Customers/Cart/cart.action";

const CartItemCard = ({ item }) => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { auth } = useSelector((store) => store);

  const handleUpdateCartItem = (value) => {
    if (value === -1 && item.quantity === 1) {
      handleRemoveCartItem();
      return;
    }
    const data = { cartItemId: item.id, quantity: item.quantity + value };
    dispatch(updateCartItem({ data, jwt: auth.jwt || jwt }));
  };

  const handleRemoveCartItem = () => {
    dispatch(removeCartItem({ cartItemId: item.id, jwt: auth.jwt || jwt }));
  };

  return (
    <div className="px-5 py-4 border border-gray-300 rounded-lg shadow-md">
      <div className="lg:flex items-center lg:space-x-5">
        <div>
          <img
            className="w-[5rem] h-[5rem] object-cover rounded"
            src={item.food.images[0]}
            alt={item.food.name}
          />
        </div>

        <div className="flex items-center justify-between lg:w-[70%]">
          <div className="space-y-1 lg:space-y-3 w-full">
            <p className="font-semibold text-gray-800">{item.food.name}</p>
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => handleUpdateCartItem(-1)}
                  className="bg-gray-300 text-gray-700 px-2 py-1 rounded hover:bg-gray-400"
                >
                  ➖
                </button>
                <span className="w-6 text-center text-gray-800 font-semibold">
                  {item.quantity}
                </span>
                <button
                  onClick={() => handleUpdateCartItem(1)}
                  className="bg-gray-300 text-gray-700 px-2 py-1 rounded hover:bg-gray-400"
                >
                  ➕
                </button>
              </div>
            </div>
          </div>
          <p className="font-semibold text-gray-900">₹{item.totalPrice}</p>
        </div>
      </div>
      <div className="pt-3 flex flex-wrap gap-2">
        {item.ingredients.map((ingredient, index) => (
          <span
            key={index}
            className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-sm"
          >
            {ingredient}
          </span>
        ))}
      </div>
    </div>
  );
};

export default CartItemCard;
