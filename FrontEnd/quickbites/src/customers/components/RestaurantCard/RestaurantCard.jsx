import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToFavorites } from "../../../State/Authentication/Action";
import { isPresentInFavorites } from "../../../config/logic";

const RestaurantCard = ({ data }) => {
  const navigate = useNavigate();
  const { auth } = useSelector((store) => store);
  const jwt = localStorage.getItem("jwt");
  const dispatch = useDispatch();

  const handleAddToFavorites = () => {
    dispatch(addToFavorites({ restaurantId: data.id, jwt: auth.jwt || jwt }));
  };

  const navigateToRestaurant = () => {
    if (data.open) {
      navigate(`/restaurant/${data.address.city}/${data.name}/${data.id}`);
    }
  };

  return (
    <div className="m-5 w-72 border border-gray-300 rounded-lg shadow-lg overflow-hidden transition-transform transform hover:-translate-y-2">
      <div
        onClick={navigateToRestaurant}
        className={`${data.open ? "cursor-pointer" : "cursor-not-allowed"} relative`}
      >
        <img className="w-full h-40 object-cover" src={data.images[0]} alt={data.name} />
        <span
          className={`absolute top-2 left-2 px-2 py-1 text-sm font-semibold rounded ${
            data.open ? "bg-green-500 text-white" : "bg-red-500 text-white"
          }`}
        >
          {data.open ? "Open" : "Closed"}
        </span>
      </div>
      <div className="p-4 flex justify-between items-start">
        <div>
          <p className="font-semibold text-lg">{data.name}</p>
          <p className="text-gray-500 text-sm">
            {data.description.length > 40 ? `${data.description.substring(0, 40)}...` : data.description}
          </p>
        </div>
        <button onClick={handleAddToFavorites} className="text-red-500 hover:text-red-600 text-xl">
          {isPresentInFavorites(auth.favorites, data) ? "❤️" : "🤍"}
        </button>
      </div>
    </div>
  );
};

export default RestaurantCard;
