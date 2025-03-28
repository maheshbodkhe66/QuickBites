import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateRestaurantStatus } from "../../State/Customers/Restaurant/restaurant.action";
import {
  FaInstagram,
  FaTwitter,
  FaLinkedin,
  FaFacebook,
} from "react-icons/fa";

const Details = () => {
  const dispatch = useDispatch();
  const { auth, restaurant } = useSelector((store) => store);
  const jwt = localStorage.getItem("jwt");
  const userRestaurant = restaurant.usersRestaurant || {};
  const address = userRestaurant.address || {};
  const contact = userRestaurant.contactInformation || {};

  const handleRestaurantStatus = () => {
    dispatch(
      updateRestaurantStatus({
        restaurantId: userRestaurant.id,
        jwt: auth.jwt || jwt,
      })
    );
  };

  return (
    <div className="lg:px-20 px-5">
      <div className="py-5 flex justify-center items-center gap-5">
        <h1 className="text-2xl lg:text-7xl text-center font-bold p-5">
          {userRestaurant.name || "Restaurant Name"}
        </h1>
        <button
          onClick={handleRestaurantStatus}
          className={`py-3 px-6 rounded-lg text-white font-semibold transition-colors ${
            userRestaurant.open ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"
          }`}
        >
          {userRestaurant.open ? "Close" : "Open"}
        </button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Restaurant Details */}
        <div className="bg-rose-50 p-6 rounded-lg shadow-md text-blue-400">
          <h2 className="text-lg font-semibold mb-4">Restaurant Details</h2>
          <p><strong>Owner:</strong> {userRestaurant.owner?.fullName || "N/A"}</p>
          <p><strong>Cuisine Type:</strong> {userRestaurant.cuisineType || "N/A"}</p>
          <p><strong>Opening Hours:</strong> {userRestaurant.openingHours || "N/A"}</p>
          <p>
            <strong>Status:</strong> 
            <span className={`ml-2 px-3 py-1 rounded-full text-black ${userRestaurant.open ? "bg-green-400" : "bg-red-400"}`}>
              {userRestaurant.open ? "Open" : "Closed"}
            </span>
          </p>
        </div>
        {/* Address Details */}
        <div className="bg-rose-50 p-6 rounded-lg shadow-md text-blue-400">
          <h2 className="text-lg font-semibold mb-4">Address</h2>
          <p><strong>Country:</strong> {address.country || "N/A"}</p>
          <p><strong>City:</strong> {address.city || "N/A"}</p>
          <p><strong>Postal Code:</strong> {address.postalCode || "N/A"}</p>
          <p><strong>Street Address:</strong> {address.streetAddress || "N/A"}</p>
        </div>
        {/* Contact Details */}
        <div className="bg-rose-50 p-6 rounded-lg shadow-md text-blue-400 col-span-2">
          <h2 className="text-lg font-semibold mb-4">Contact</h2>
          <p><strong>Email:</strong> {contact.email || "N/A"}</p>
          <p><strong>Mobile:</strong> {contact.mobile ? `+91 ${contact.mobile}` : "N/A"}</p>
          <div className="flex items-center mt-3 space-x-4">
            <a href={contact.instagram} target="_blank" rel="noreferrer">
              <FaInstagram className="text-pink-500 text-2xl" />
            </a>
            <a href={contact.twitter} target="_blank" rel="noreferrer">
              <FaTwitter className="text-blue-400 text-2xl" />
            </a>
            <a href={contact.linkedin} target="_blank" rel="noreferrer">
              <FaLinkedin className="text-blue-600 text-2xl" />
            </a>
            <a href={contact.facebook} target="_blank" rel="noreferrer">
              <FaFacebook className="text-blue-700 text-2xl" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
