import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../../../State/Customers/Cart/cart.action";
import { categorizedIngredients } from "../../util/CategorizeIngredients";

const MenuItemCard = ({ item }) => {
  const dispatch = useDispatch();
  const [selectedIngredients, setSelectedIngredients] = useState([]);

  const handleCheckboxChange = (itemName) => {
    setSelectedIngredients((prev) =>
      prev.includes(itemName)
        ? prev.filter((ingredient) => ingredient !== itemName)
        : [...prev, itemName]
    );
  };

  const handleAddItemToCart = (e) => {
    e.preventDefault();
    const data = {
      token: localStorage.getItem("jwt"),
      cartItem: {
        menuItemId: item.id,
        quantity: 1,
        ingredients: selectedIngredients,
      },
    };
    dispatch(addItemToCart(data));
  };

  return (
    <div className="border border-gray-300 rounded-lg shadow-md p-4 mb-4">
      <div className="flex items-center space-x-5">
        <img className="w-28 h-28 object-cover rounded" src={item.images[0]} alt={item.name} />
        <div className="space-y-2">
          <h3 className="font-semibold text-lg">{item.name}</h3>
          <p className="text-gray-700">₹{item.price}</p>
          <p className="text-gray-500">{item.description}</p>
        </div>
      </div>

      <form onSubmit={handleAddItemToCart} className="mt-4">
        <div className="flex flex-wrap gap-5">
          {Object.keys(categorizedIngredients(item?.ingredients)).map((category) => (
            <div key={category} className="pr-5">
              <p className="font-semibold text-gray-800">{category}</p>
              <div className="space-y-2">
                {categorizedIngredients(item?.ingredients)[category].map((ingredient) => (
                  <label key={ingredient.name} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={selectedIngredients.includes(ingredient.name)}
                      onChange={() => handleCheckboxChange(ingredient.name)}
                      disabled={!ingredient.inStoke}
                      className="form-checkbox h-5 w-5 text-blue-600"
                    />
                    <span className={`text-sm ${ingredient.inStoke ? "text-gray-800" : "text-gray-400"}`}>
                      {ingredient.name}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="pt-5">
          <button
            type="submit"
            disabled={!item.available}
            className={`w-full py-2 px-4 rounded text-white ${item.available ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-400 cursor-not-allowed"}`}
          >
            {item.available ? "Add To Cart" : "Out of Stock"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default MenuItemCard;