import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../../State/Authentication/Action";

const menu = [
  { title: "Orders", icon: "📦" },
  { title: "Favorites", icon: "❤️" },
  { title: "Address", icon: "🏠" },
  { title: "Payments", icon: "💳" },
  { title: "Notification", icon: "🔔" },
  { title: "Events", icon: "🎉" },
  { title: "Logout", icon: "🚪" },
];

const ProfileNavigation = ({ handleClose, open }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const handleNavigate = (item) => {
    if (item.title === "Logout") {
      handleLogout();
    } else {
      navigate(`/my-profile/${item.title.toLowerCase()}`);
    }
    handleClose?.();
  };

  return (
    <div
      className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transition-transform transform ${
        open ? "translate-x-0" : "-translate-x-full"
      } lg:translate-x-0 lg:static`}
    >
      <nav className="flex flex-col py-5">
        {menu.map((item, index) => (
          <button
            key={index}
            onClick={() => handleNavigate(item)}
            className="flex items-center space-x-3 p-3 text-gray-700 hover:bg-gray-200 transition"
          >
            <span className="text-lg">{item.icon}</span>
            <span>{item.title}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default ProfileNavigation;
