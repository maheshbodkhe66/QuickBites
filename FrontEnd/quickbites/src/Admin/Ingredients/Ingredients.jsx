import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateStockOfIngredient } from "../../State/Admin/Ingredients/Action";
import CreateIngredientCategoryForm from "./CreateIngredientCategory";
import CreateIngredientForm from "./CreateIngredientForm";

const Ingredients = () => {
  const dispatch = useDispatch();
  const { ingredients } = useSelector((store) => store);
  const jwt = localStorage.getItem("jwt");

  const [openIngredientCategory, setOpenIngredientCategory] = useState(false);
  const [openIngredient, setOpenIngredient] = useState(false);

  const handleUpdateStock = (id) => {
    dispatch(updateStockOfIngredient({ id, jwt }));
  };

  return (
    <div className="px-4 py-5">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white shadow-md rounded p-5">
          <div className="flex justify-between items-center border-b pb-3 mb-3">
            <h2 className="text-xl font-semibold">Ingredients</h2>
            <button
              onClick={() => setOpenIngredient(true)}
              className="bg-blue-500 text-white px-3 py-1 rounded"
            >
              Add
            </button>
          </div>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">Id</th>
                <th className="border p-2">Name</th>
                <th className="border p-2">Category</th>
                <th className="border p-2">Availability</th>
              </tr>
            </thead>
            <tbody>
              {ingredients.ingredients.map((item) => (
                <tr key={item.id} className="text-center">
                  <td className="border p-2">{item.id}</td>
                  <td className="border p-2">{item.name}</td>
                  <td className="border p-2">{item.category.name}</td>
                  <td className="border p-2">
                    <button
                      onClick={() => handleUpdateStock(item.id)}
                      className={`px-2 py-1 rounded text-white ${item.inStock ? "bg-green-500" : "bg-red-500"}`}
                    >
                      {item.inStock ? "In Stock" : "Out of Stock"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-white shadow-md rounded p-5">
          <div className="flex justify-between items-center border-b pb-3 mb-3">
            <h2 className="text-xl font-semibold">Categories</h2>
            <button
              onClick={() => setOpenIngredientCategory(true)}
              className="bg-blue-500 text-white px-3 py-1 rounded"
            >
              Add
            </button>
          </div>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">Id</th>
                <th className="border p-2">Name</th>
              </tr>
            </thead>
            <tbody>
              {ingredients.category.map((item) => (
                <tr key={item.id} className="text-center">
                  <td className="border p-2">{item.id}</td>
                  <td className="border p-2">{item.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {openIngredient && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-5 rounded shadow-md">
            <CreateIngredientForm handleClose={() => setOpenIngredient(false)} />
          </div>
        </div>
      )}

      {openIngredientCategory && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-5 rounded shadow-md">
            <CreateIngredientCategoryForm handleClose={() => setOpenIngredientCategory(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Ingredients;