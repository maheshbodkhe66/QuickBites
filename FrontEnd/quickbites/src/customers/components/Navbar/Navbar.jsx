import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../State/Authentication/Action";
import { ToastContainer, toast } from 'react-toastify';
import logo from "../../../assets/logo.png";
import Search from "../../../assets/search.png";
import pic from "../../../assets/boy.png";
import cartpic from "../../../assets/trolley.png";

const Navbar = () => {
  const navigate = useNavigate();
  const { auth, cart } = useSelector((store) => store);
  const dispatch = useDispatch();
  const [menuOpen, setMenuOpen] = useState(false);

  const navigateToCart = () => navigate("/cart");
  const navigateToLogin = () => {
    toast("login successfull");
    navigate("/account/login")};
  const navigateToHome = () => navigate("/");
  
  const navigateToProfile = () => {
    setMenuOpen(false); // Close menu after navigating
    if (auth.user?.role === "ROLE_ADMIN" || auth.user?.role === "ROLE_RESTAURANT_OWNER") {
      navigate("/admin/restaurant");
    } else {
      navigate("/my-profile");
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    setMenuOpen(false);
    navigate("/account/login"); // Redirect after logout
  };

  return (
    <div className="px-5 z-50 py-4 mx-8 rounded-sm shadow-xl bg-orange-400 lg:px-20 flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <div onClick={navigateToHome} className="cursor-pointer flex items-center space-x-4">
          <img src={logo} alt="QuickBites" className="logo rounded-md" width={150} />
        </div>
      </div>

      <div className="flex items-center space-x-6">
        <button onClick={() => navigate("/search")} className="text-white text-xl">
          <img src={Search} alt="Search" className="h-6 w-6 rounded-md" />
        </button>

        {/* Profile Button */}
        <div className="relative">
          {auth.user?.fullName ? (
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="bg-white text-pink-500 font-bold w-10 h-10 rounded-full flex items-center justify-center"
            >
              {auth.user.fullName[0].toUpperCase()}
            </button>
          ) : (
            <button onClick={navigateToLogin} className="text-white text-xl">
              <img src={pic} alt="Profile" className="h-8 w-8 rounded-md" />
            </button>
          )}

          {/* Profile Dropdown */}
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white shadow-md rounded-md py-2">
              <button
                onClick={navigateToProfile}
                className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left"
              >
                Profile
              </button>
              <button
                onClick={handleLogout}
                className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left"
              >
                Logout
              </button>
            </div>
          )}
        </div>

        {/* Cart Button */}
        <button onClick={navigateToCart} className="relative text-white text-xl">
          <img src={cartpic} alt="Cart" className="h-8 w-8 rounded-md" />
          {cart.cartItems.length > 0 && (
            <span className="absolute top-0 right-0 bg-black text-white text-xs rounded-full px-2">
              {cart.cartItems.length}
            </span>
          )}
        </button>
      </div>
    </div>
  );
};

export default Navbar;