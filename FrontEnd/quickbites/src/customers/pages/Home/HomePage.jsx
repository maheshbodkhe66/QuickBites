import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../components/Navbar/Navbar";
import MultipleItemsCarousel from "../../components/MultiItemCarousel/MultiItemCarousel";
import { getAllRestaurantsAction } from "../../../State/Customers/Restaurant/restaurant.action";
import RestaurantCard from "../../components/RestaurantCard/RestaurantCard";
import Footer from "../../components/Footer/Footer";

const HomePage = () => {
  const { auth, restaurant } = useSelector((store) => store);
  const dispatch = useDispatch();

  useEffect(() => {
    if (auth.user) {
      dispatch(getAllRestaurantsAction(localStorage.getItem("jwt")));
    }
  }, [auth.user]);

  return (
    <div>

      {/* Hero Section */}
      <section className="relative shadow-black m-2 mx-8 flex flex-col justify-center items-center bg-cover bg-center h-[100vh] lg:h-[50vh] text-orange-300 text-center px-4"
        style={{ backgroundImage: "url('https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg')" }}>
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10">
          <h1 className="text-4xl md:text-7xl font-extrabold drop-shadow-lg">QuickBites</h1>
          <p className="text-lg md:text-2xl mt-4 drop-shadow-md">
            Taste the Convenience: Food, Fast and Delivered.
          </p>
        </div>
        <div className="absolute bottom-0 w-full h-20 bg-gradient-to-t from-black"></div>
      </section>

      

      {/* Top Meals Section */}
      <section className="px-5 mx-8 md:px-20 py-10 ">
        <h2 className="text-2xl font-bold text-gray-700 mb-6">Top Meals</h2>
        <MultipleItemsCarousel />
      </section>

      {/* Restaurants Section */}
      <section className="px-5 md:px-20 py-10">
        <h2 className="text-2xl font-bold text-gray-700 mb-6">
          Order From Our Handpicked Favorites
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {restaurant.restaurants.map((item, i) => (
            <div key={i} className="shadow-lg rounded-lg p-2 bg-white">
              <RestaurantCard data={item} />
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default HomePage;
