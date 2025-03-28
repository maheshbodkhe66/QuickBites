import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRestaurantById, getRestaurantsCategory } from '../../State/Customers/Restaurant/restaurant.action';
import CreateCategory from './CreateCategory';

const Category = () => {
    const dispatch = useDispatch();
    const { auth, restaurant } = useSelector(store => store);
    const jwt = localStorage.getItem("jwt");
    const [openCreateCategory, setOpenCreateCategory] = useState(false);

    const handleOpenCreateCategory = () => setOpenCreateCategory(true);
    const handleCloseCreateCategory = () => setOpenCreateCategory(false);

    return (
        <div className="p-4">
            <div className="bg-white shadow-md rounded-lg p-4">
                <div className="flex justify-between items-center border-b pb-2 mb-4">
                    <h2 className="text-xl font-bold">Categories</h2>
                    <button
                        onClick={handleOpenCreateCategory}
                        className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
                    >
                        + Add Category
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-200">
                        <thead>
                            <tr className="bg-gray-100 border-b">
                                <th className="border px-4 py-2">Id</th>
                                <th className="border px-4 py-2">Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {restaurant.categories.map((item, index) => (
                                <tr key={item.id} className="border-b hover:bg-gray-50">
                                    <td className="border px-4 py-2">{item?.id}</td>
                                    <td className="border px-4 py-2">{item.name}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {openCreateCategory && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <button
                            onClick={handleCloseCreateCategory}
                            className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
                        >
                            ✕
                        </button>
                        <CreateCategory handleClose={handleCloseCreateCategory} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Category;