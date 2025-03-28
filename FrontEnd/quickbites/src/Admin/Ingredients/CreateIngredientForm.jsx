import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createIngredient } from "../../State/Admin/Ingredients/Action";

const CreateIngredientForm = ({ handleClose }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { auth, restaurant, ingredients } = useSelector((store) => store);
  const jwt = localStorage.getItem("jwt");

  const [formData, setFormData] = useState({
    name: "",
    ingredientCategoryId: "",
  });

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const data = { ...formData, restaurantId: restaurant.usersRestaurant.id };
    dispatch(createIngredient({ jwt: auth.jwt || jwt, data }));
    setFormData({ name: "", ingredientCategoryId: "" });
    handleClose();
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="p-5 bg-white shadow-md rounded-md w-full max-w-md mx-auto">
      <h1 className="text-gray-700 text-center text-xl pb-4 font-semibold">Create Ingredient</h1>
      <form className="space-y-4" onSubmit={handleFormSubmit}>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          placeholder="Ingredient Name"
        />

        <select
          name="ingredientCategoryId"
          value={formData.ingredientCategoryId}
          onChange={handleInputChange}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
        >
          <option value="">Select Category</option>
          {ingredients.category.map((item) => (
            <option key={item.id} value={item.id}>{item.name}</option>
          ))}
        </select>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default CreateIngredientForm;
