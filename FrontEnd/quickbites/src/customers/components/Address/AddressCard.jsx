import React from "react";

const AddressCard = ({ handleSelectAddress, item, showButton }) => {
  return (
    <div className="flex space-x-5 w-64 p-5 border border-gray-300 rounded-lg shadow-md">
      <div className="text-gray-500">
        {/* Home Icon SVG */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 10l9-7 9 7v10a2 2 0 01-2 2h-4m-6 0H5a2 2 0 01-2-2V10z"
          />
        </svg>
      </div>

      <div className="space-y-3 text-gray-700">
        <h1 className="font-semibold text-lg text-gray-900">Home</h1>
        <p className="text-sm">
          {item.streetAddress}, {item.postalCode}, {item.state}, {item.country}
        </p>

        {showButton && (
          <button
            onClick={() => handleSelectAddress(item)}
            className="w-full px-4 py-2 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-500 hover:text-white transition"
          >
            Select
          </button>
        )}
      </div>
    </div>
  );
};

export default AddressCard;
