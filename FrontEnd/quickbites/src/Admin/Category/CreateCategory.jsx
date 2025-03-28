import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createCategoryAction } from '../../State/Customers/Restaurant/restaurant.action';

const CreateCategory = ({ handleClose }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { auth } = useSelector(store => store);
  const jwt = localStorage.getItem("jwt");

  const [formData, setFormData] = useState({
    categoryName: '',
  });

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const data = {
      name: formData.categoryName,
      restaurant: { id }
    };
    dispatch(createCategoryAction({ reqData: data, jwt: auth.jwt || jwt }));
    setFormData({ categoryName: '' });
    handleClose();
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="p-5">
      <h1 className="text-gray-600 text-center text-xl pb-4">Create Category</h1>
      <form className="space-y-4" onSubmit={handleFormSubmit}>
        <input
          type="text"
          placeholder="Category Name"
          name="categoryName"
          value={formData.categoryName}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
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

export default CreateCategory;
