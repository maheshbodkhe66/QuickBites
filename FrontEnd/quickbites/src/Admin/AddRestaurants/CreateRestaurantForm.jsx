import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { createRestaurant } from "../../State/Customers/Restaurant/restaurant.action";
import { uploadToCloudinary } from "../utils/UploadToCloudnary";

const CreateRestaurantForm = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("jwt");
  const [uploadingImage, setUploadingImage] = useState(false);
  
  // Using React Hook Form
  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      name: "",
      description: "",
      cuisineType: "",
      streetAddress: "",
      city: "",
      stateProvince: "",
      postalCode: "",
      country: "",
      email: "",
      mobile: "",
      twitter: "",
      instagram: "",
      openingHours: "Mon-Sun: 9:00 AM - 9:00 PM",
      images: [],
    },
  });

  const onSubmit = (values) => {
    const data = {
      name: values.name,
      description: values.description,
      cuisineType: values.cuisineType,
      address: {
        streetAddress: values.streetAddress,
        city: values.city,
        stateProvince: values.stateProvince,
        postalCode: values.postalCode,
        country: values.country,
      },
      contactInformation: {
        email: values.email,
        mobile: values.mobile,
        twitter: values.twitter,
        instagram: values.instagram,
      },
      openingHours: values.openingHours,
      images: values.images,
    };
    dispatch(createRestaurant({ data, token }));
  };

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadingImage(true);
      const image = await uploadToCloudinary(file);
      setValue("images", [...watch("images"), image]);
      setUploadingImage(false);
    }
  };

  const handleRemoveImage = (index) => {
    const updatedImages = [...watch("images")];
    updatedImages.splice(index, 1);
    setValue("images", updatedImages);
  };

  return (
    <div className="py-10 px-5 flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-3xl">
        <h1 className="text-2xl font-bold text-center mb-4">Add New Restaurant</h1>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Image Upload */}
          <div className="flex flex-wrap gap-3">
            <label className="cursor-pointer w-24 h-24 flex items-center justify-center border-2 border-dashed border-gray-400 rounded-lg text-gray-600">
              <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
              {uploadingImage ? "Uploading..." : "+"}
            </label>
            {watch("images").map((image, index) => (
              <div key={index} className="relative w-24 h-24">
                <img src={image} alt={`Uploaded ${index + 1}`} className="w-full h-full object-cover rounded-md" />
                <button
                  type="button"
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                  onClick={() => handleRemoveImage(index)}
                >
                  X
                </button>
              </div>
            ))}
          </div>

          {/* Input Fields */}
          {Object.keys(watch()).map(
            (key) =>
              key !== "images" && (
                <input
                  key={key}
                  type="text"
                  {...register(key)}
                  placeholder={key.replace(/([A-Z])/g, " $1").trim()}
                  className="w-full p-2 border rounded-md"
                />
              )
          )}

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
          >
            Create Restaurant
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateRestaurantForm;
