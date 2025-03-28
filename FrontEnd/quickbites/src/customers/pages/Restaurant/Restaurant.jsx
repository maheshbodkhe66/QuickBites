import React, { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getRestaurantById, getRestaurantsCategory } from "../../../State/Customers/Restaurant/restaurant.action";
import { getMenuItemsByRestaurantId } from "../../../State/Customers/Menu/menu.action";
import MenuItemCard from "../../components/MenuItem/MenuItemCard";

const foodTypes = [
  { label: "All", value: "all" },
  { label: "Vegetarian Only", value: "vegetarian" },
  { label: "Non-Vegetarian Only", value: "non_vegetarian" },
  { label: "Seasonal", value: "seasonal" },
];

const Restaurant = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { restaurant, menu } = useSelector((store) => store);
  const jwt = localStorage.getItem("jwt");

  // Get filter parameters from URL
  const searchParams = new URLSearchParams(decodeURIComponent(location.search));
  const foodType = searchParams.get("food_type");
  const foodCategory = searchParams.get("food_category");

  useEffect(() => {
    dispatch(getRestaurantById({ jwt, restaurantId: id }));
    dispatch(
      getMenuItemsByRestaurantId({
        jwt,
        restaurantId: id,
        seasonal: foodType === "seasonal",
        vegetarian: foodType === "vegetarian",
        nonveg: foodType === "non_vegetarian",
        foodCategory: foodCategory || "",
      })
    );
    dispatch(getRestaurantsCategory({ restaurantId: id, jwt }));
  }, [id, foodType, foodCategory]);

  const handleFilter = (e) => {
    const { name, value } = e.target;
    const searchParams = new URLSearchParams(location.search);

    if (value === "all") {
      searchParams.delete(name);
      searchParams.delete("food_category");
    } else {
      searchParams.set(name, value);
    }

    navigate({ search: `?${searchParams.toString()}` });
  };

  return (
    <div className="px-5 lg:px-20">
      {/* Breadcrumbs */}
      <h3 className="text-gray-500 py-2 mt-10">
        Home / {restaurant.restaurant?.address?.country} /{" "}
        {restaurant.restaurant?.name} / {restaurant.restaurant?.id} / Order Online
      </h3>

      {/* Restaurant Images */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-5">
        {restaurant.restaurant?.images?.slice(0, 3).map((img, index) => (
          <img key={index} className="w-full h-80 object-cover rounded-lg" src={img} alt={`restaurant-${index}`} />
        ))}
      </div>

      {/* Restaurant Info */}
      <div className="pt-5 pb-5">
        <h1 className="text-4xl font-semibold">{restaurant.restaurant?.name}</h1>
        <p className="text-gray-500 mt-2">{restaurant.restaurant?.description}</p>
        <div className="mt-3">
          <p className="text-gray-500 flex items-center gap-3">
            📍 {restaurant.restaurant?.address?.streetAddress}
          </p>
          <p className="flex items-center gap-3 text-gray-500">
            ⏰ <span className="text-orange-500">{restaurant.restaurant?.openingHours} (Today)</span>
          </p>
        </div>
      </div>

      {/* Filters Section */}
      <div className="flex flex-col lg:flex-row gap-10">
        {/* Sidebar - Food Filters */}
        <div className="lg:w-1/4 space-y-5 border p-5 rounded-lg shadow-md bg-white">
          {/* Food Type Filter */}
          <div>
            <h3 className="text-lg font-semibold">Food Type</h3>
            <div className="space-y-2 mt-2">
              {foodTypes.map((item) => (
                <label key={item.value} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="food_type"
                    value={item.value}
                    checked={foodType === item.value || (!foodType && item.value === "all")}
                    onChange={handleFilter}
                    className="accent-orange-500"
                  />
                  {item.label}
                </label>
              ))}
            </div>
          </div>

          {/* Food Category Filter */}
          <div>
            <h3 className="text-lg font-semibold">Food Category</h3>
            <div className="space-y-2 mt-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="food_category"
                  value="all"
                  checked={!foodCategory || foodCategory === "all"}
                  onChange={handleFilter}
                  className="accent-orange-500"
                />
                All
              </label>
              {restaurant?.categories?.map((item) => (
                <label key={item.name} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="food_category"
                    value={item.name}
                    checked={foodCategory === item.name}
                    onChange={handleFilter}
                    className="accent-orange-500"
                  />
                  {item.name}
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Menu Items Section */}
        <div className="lg:w-3/4 space-y-5">
          {menu?.menuItems?.length > 0 ? (
            menu?.menuItems?.map((item) => <MenuItemCard key={item.id} item={item} />)
          ) : (
            <p className="text-center text-gray-500">No items available.</p>
          )}
        </div>
      </div>

      {/* Loading Indicator */}
      {(menu.loading || restaurant.loading) && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50">
          <div className="w-16 h-16 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
};

export default Restaurant;
