import React from "react";
import { useDispatch } from "react-redux";
import { deleteEventAction } from "../../State/Customers/Restaurant/restaurant.action";

const EventCard = ({ item, isCustomer }) => {
  const dispatch = useDispatch();

  const handleDeleteEvent = () => {
    dispatch(deleteEventAction(item.id));
  };

  return (
    <div className="w-80 bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="relative group">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800">{item.restaurant.name}</h3>
        <p className="text-gray-600 text-sm">{item.name}</p>
        <div className="py-2 space-y-2">
          <p className="text-gray-700">{item.location}</p>
          <p className="text-sm text-blue-500">{item.startedAt}</p>
          <p className="text-sm text-red-500">{item.endsAt}</p>
        </div>
        {!isCustomer && (
          <button
            onClick={handleDeleteEvent}
            className="mt-3 text-white bg-red-500 hover:bg-red-600 px-3 py-1 rounded flex items-center gap-2"
          >
            Delete
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default EventCard;
