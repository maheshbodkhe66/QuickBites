import React from "react";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../../../State/Customers/Cart/cart.action";
import { useNavigate } from "react-router-dom";

const SearchDishCard = ({ item }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddItemToCart = () => {
    const data = {
      token: localStorage.getItem("jwt"),
      cartItem: {
        menuItemId: item.id,
        quantity: 1,
      },
    };
    dispatch(addItemToCart(data));
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-4 flex flex-col justify-between w-full sm:w-[22rem] mx-2 my-4">
      {/* Restaurant Name & Navigation */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">{item.restaurant?.name}</h3>
        <button
          onClick={() =>
            navigate(
              `/restaurant/${item.restaurant.address.city}/${item.restaurant.name}/${item.restaurant.id}`
            )
          }
          className="text-blue-500 hover:text-blue-700 transition duration-300"
        >
          →
        </button>
      </div>

      {/* Dish Info */}
      <div className="flex justify-between mt-3">
        <div className="w-3/5">
          <h2 className="font-semibold text-xl">{item.name}</h2>
          <p className="text-gray-500">₹{item.price}</p>
          <p className="text-sm text-gray-400 mt-1">{item.description}</p>
        </div>
        <div className="flex flex-col items-center">
          <img
            className="w-20 h-20 object-cover rounded-lg"
            src={item.images[0]}
            alt={item.name}
          />
          <button
            onClick={handleAddItemToCart}
            className="mt-2 bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600 transition duration-300"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchDishCard;
