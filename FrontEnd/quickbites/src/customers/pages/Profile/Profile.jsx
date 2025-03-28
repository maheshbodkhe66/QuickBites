import React from "react";
import ProfileNavigation from "../../components/ProfileNavigation/ProfileNavigation";
import { Route, Routes } from "react-router-dom";
import Orders from "../Orders/Orders";
import UsersAddresses from "../UsersAdresses/UsersAddresses";
import Favorite from "../Favorite/Favorite";
import UserProfile from "./UserProfile";
import CustomerEvents from "./CustomerEvents";
import Notifications from "./Notifications";
import PaymentSuccess from "../PaymentSuccess/PaymentSuccess";

const Profile = () => {
  return (
    <div className="lg:flex justify-between">
      <div className="sticky h-[80vh] lg:w-[20%] bg-gray  -100 p-4 rounded-lg shadow-md">
        <ProfileNavigation />
      </div>
      <div className="lg:w-[80%] p-4">
        <Routes>
          <Route path="/" element={<UserProfile />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/address" element={<UsersAddresses />} />
          <Route path="/favorites" element={<Favorite />} />
          <Route path="/payments" element={<PaymentSuccess />} />
          <Route path="/events" element={<CustomerEvents />} />
          <Route path="/notification" element={<Notifications />} />
        </Routes>
      </div>
    </div>
  );
};

export default Profile;
