import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { createIngredientCategory } from "../../State/Admin/Ingredients/Action";

const CreateIngredientCategoryForm = ({ handleClose }) => {
  const dispatch = useDispatch();
  const { restaurant, auth } = useSelector((store) => store);
  const jwt = localStorage.getItem("jwt");
  const [formData, setFormData] = useState({ name: "" });

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const data = {
      name: formData.name,
      restaurantId: restaurant.usersRestaurant.id,
    };
    dispatch(createIngredientCategory({ data, jwt: auth.jwt || jwt }));
    handleClose();
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="p-5 bg-white shadow-md rounded-md w-full max-w-md mx-auto">
      <h1 className="text-gray-700 text-center text-xl pb-4 font-semibold">
        Create Ingredient Category
      </h1>
      <form className="space-y-4" onSubmit={handleFormSubmit}>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          placeholder="Category Name"
        />
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

export default CreateIngredientCategoryForm;
