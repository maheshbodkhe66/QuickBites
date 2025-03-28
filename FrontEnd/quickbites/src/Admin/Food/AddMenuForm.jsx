import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { uploadToCloudinary } from "../utils/UploadToCloudnary";
import { createMenuItem } from "../../State/Customers/Menu/menu.action";

const AddMenuForm = () => {
  const dispatch = useDispatch();
  const { restaurant, auth, ingredients, menu } = useSelector((store) => store);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const jwt = localStorage.getItem("jwt");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      description: "",
      price: "",
      category: "",
      images: [],
      vegetarian: true,
      seasonal: false,
      ingredients: [],
    },
  });

  useEffect(() => {
    if (restaurant.usersRestaurant) {
      setValue("restaurantId", restaurant.usersRestaurant.id);
    }
    if (menu.message || menu.error) setOpenSnackBar(true);
  }, [restaurant, menu.message, menu.error, setValue]);

  const onSubmit = (data) => {
    dispatch(createMenuItem({ menu: data, jwt: auth.jwt || jwt }));
  };

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    setUploadingImage(true);
    const imageUrl = await uploadToCloudinary(file);
    setValue("images", [...watch("images"), imageUrl]);
    setUploadingImage(false);
  };

  return (
    <div className="px-5 lg:px-32 flex justify-center min-h-screen items-center pb-5">
      <div className="w-full max-w-lg">
        <h1 className="font-bold text-2xl text-center py-2">Add New Menu Item</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex flex-wrap gap-5">
            <input type="file" accept="image/*" id="fileInput" hidden onChange={handleImageChange} />
            <label htmlFor="fileInput" className="cursor-pointer border p-3 rounded-md border-gray-600">
              {uploadingImage ? "Uploading..." : "Upload Image"}
            </label>
          </div>

          <input {...register("name", { required: "Name is required" })} className="w-full p-2 border rounded" placeholder="Name" />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}

          <input {...register("description", { required: "Description is required" })} className="w-full p-2 border rounded" placeholder="Description" />
          {errors.description && <p className="text-red-500">{errors.description.message}</p>}

          <input {...register("price", { required: "Price is required", valueAsNumber: true })} className="w-full p-2 border rounded" placeholder="Price" type="number" />
          {errors.price && <p className="text-red-500">{errors.price.message}</p>}

          <select {...register("category", { required: "Category is required" })} className="w-full p-2 border rounded">
            <option value="">Select Category</option>
            {restaurant.categories.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>

          <select {...register("vegetarian")} className="w-full p-2 border rounded">
            <option value={true}>Vegetarian</option>
            <option value={false}>Non-Vegetarian</option>
          </select>

          <select {...register("seasonal")} className="w-full p-2 border rounded">
            <option value={true}>Seasonal</option>
            <option value={false}>Non-Seasonal</option>
          </select>

          <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded w-full">Create Menu Item</button>
        </form>
      </div>
    </div>
  );
};

export default AddMenuForm;
