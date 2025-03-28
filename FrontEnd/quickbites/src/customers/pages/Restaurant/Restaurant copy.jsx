import React, { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import MenuItemCard from "../../components/MenuItem/MenuItemCard";
import { useDispatch, useSelector } from "react-redux";
import { getRestaurantById, getRestaurantsCategory } from "../../../State/Customers/Restaurant/restaurant.action";
import { getMenuItemsByRestaurantId } from "../../../State/Customers/Menu/menu.action";

const foodTypes = [
  { label: "All", value: "all" },
  { label: "Vegetarian Only", value: "vegetarian" },
  { label: "Non-Vegetarian Only", value: "non_vegetarian" },
  { label: "Seasonal", value: "seasonal" },
];

const Restaurant = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { id } = useParams();
  const { restaurant, menu } = useSelector((store) => store);
  const navigate = useNavigate();
  const jwt = localStorage.getItem("jwt");

  useEffect(() => {
    dispatch(getRestaurantById({ jwt, restaurantId: id }));
    dispatch(
      getMenuItemsByRestaurantId({
        jwt,
        restaurantId: id,
        seasonal: location.search.includes("seasonal"),
        vegetarian: location.search.includes("vegetarian"),
        nonveg: location.search.includes("non_vegetarian"),
      })
    );
    dispatch(getRestaurantsCategory({ restaurantId: id, jwt }));
  }, [id, location.search]);

  const handleFilter = (e) => {
    const searchParams = new URLSearchParams(location.search);
    e.target.value === "all"
      ? searchParams.delete(e.target.name)
      : searchParams.set(e.target.name, e.target.value);
    navigate({ search: `?${searchParams.toString()}` });
  };

  return (
    <div className="px-5 lg:px-20">
      <section className="text-gray-500 py-2 mt-10">
        Home/{restaurant.restaurant?.address.country}/
        {restaurant.restaurant?.name}/Order Online
      </section>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-5">
        {restaurant.restaurant?.images?.slice(0, 3).map((img, index) => (
          <img key={index} className="w-full h-[40vh] object-cover rounded" src={img} alt="Restaurant" />
        ))}
      </div>
      <div className="pt-3 pb-5">
        <h1 className="text-4xl font-semibold">{restaurant.restaurant?.name}</h1>
        <p className="text-gray-500 mt-1">{restaurant.restaurant?.description}</p>
      </div>

      <div className="pt-[2rem] lg:flex">
        <div className="lg:w-[20%] space-y-5">
          <h3 className="font-semibold">Food Type</h3>
          {foodTypes.map((item, index) => (
            <label key={index} className="block text-gray-600">
              <input
                type="radio"
                name="food_type"
                value={item.value}
                onChange={handleFilter}
                className="mr-2"
              />
              {item.label}
            </label>
          ))}
        </div>
        <div className="lg:w-[80%] space-y-5 lg:pl-10">
          Menu
          {menu?.menuItems.map((item, index) => (
            <MenuItemCard key={index} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Restaurant;