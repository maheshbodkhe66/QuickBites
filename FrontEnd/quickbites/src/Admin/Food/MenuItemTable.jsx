import React, { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteFoodAction,
  getMenuItemsByRestaurantId,
  updateMenuItemsAvailability,
} from "../../State/Customers/Menu/menu.action";
import { categorizedIngredients } from "../../customers/util/CategorizeIngredients";

const MenuItemTable = ({ isDashboard, name }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { menu, restaurant, auth } = useSelector((store) => store);
  const jwt = localStorage.getItem("jwt");

  useEffect(() => {
    if (restaurant.usersRestaurant) {
      dispatch(
        getMenuItemsByRestaurantId({
          restaurantId: restaurant.usersRestaurant?.id,
          jwt,
          seasonal: false,
          vegetarian: false,
          nonveg: false,
          foodCategory: "",
        })
      );
    }
  }, [dispatch, restaurant.usersRestaurant]);

  const handleFoodAvailability = (foodId) => {
    dispatch(updateMenuItemsAvailability({ foodId, jwt: auth.jwt || jwt }));
  };

  const handleDeleteFood = (foodId) => {
    dispatch(deleteFoodAction({ foodId, jwt: auth.jwt || jwt }));
  };

  return (
    <div className="w-full p-5 bg-blue-100 shadow-md rounded-lg ">
      <div className="flex justify-between items-center pb-4 border-b">
        <h2 className="text-xl font-semibold">{name}</h2>
        <button
          onClick={() => navigate("/admin/restaurant/add-menu")}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Item
        </button>
      </div>
      <table className="w-full mt-4 bg-white border-collapse border border-gray-300 ">
        <thead>
          <tr className="bg-orange-200">
            <th className="border p-2">Image</th>
            <th className="border p-2">Title</th>
            {!isDashboard && <th className="border p-2">Ingredients</th>}
            <th className="border p-2">Price</th>
            <th className="border p-2">Availability</th>
            {!isDashboard && <th className="border p-2">Delete</th>}
          </tr>
        </thead>
        <tbody>
          {menu.menuItems?.map((item) => (
            <tr key={item.id} className="text-center border-b">
              <td className="p-2">
                <img src={item.images[0]} alt={item.name} className="w-12 h-12 rounded-full mx-auto" />
              </td>
              <td className="p-2 font-medium">{item.name}</td>
              {!isDashboard && (
                <td className="p-2 text-left">
                  {Object.keys(categorizedIngredients(item?.ingredients))?.map((category) => (
                    <div key={category}>
                      <p className="font-semibold">{category}</p>
                      <ul className="pl-5 list-disc text-gray-600">
                        {categorizedIngredients(item?.ingredients)[category].map((ingredient) => (
                          <li key={ingredient.id}>{ingredient.name}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </td>
              )}
              <td className="p-2">₹{item.price}</td>
              <td className="p-2">
                <button
                  onClick={() => handleFoodAvailability(item.id)}
                  className={`px-4 py-1 rounded ${item.available ? "bg-green-500 text-white" : "bg-red-500 text-white"}`}
                >
                  {item.available ? "In Stock" : "Out of Stock"}
                </button>
              </td>
              {!isDashboard && (
                <td className="p-2">
                  <button
                    onClick={() => handleDeleteFood(item.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      {menu.loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-white text-lg">Loading...</div>
        </div>
      )}
    </div>
  );
};

export default MenuItemTable;
