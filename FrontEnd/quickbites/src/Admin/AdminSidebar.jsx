import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../State/Authentication/Action";

const menu = [
  { title: "Dashboard", icon: "📊", path: "/" },
  { title: "Orders", icon: "🛒", path: "/orders" },
  { title: "Menu", icon: "🍽️", path: "/menu" },
  { title: "Food Category", icon: "📂", path: "/category" },
  { title: "Ingredients", icon: "🥕", path: "/ingredients" },
  { title: "Events", icon: "🎉", path: "/event" },
  { title: "Details", icon: "🔍", path: "/details" },
  { title: "Logout", icon: "🚪", path: "/" },
];

export default function AdminSidebar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleNavigate = (item) => {
    if (item.title === "Logout") {
      dispatch(logout());
      navigate("/");
    } else {
      navigate(`/admin/restaurant${item.path}`);
    }
  };

  return (
    <div className="fixed top-0 left-0 h-full w-64 bg-white shadow-lg lg:static">
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
}
