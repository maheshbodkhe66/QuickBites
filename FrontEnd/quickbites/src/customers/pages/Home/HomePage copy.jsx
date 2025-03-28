import React, { useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import MultipleItemsCarousel from "../../components/MultiItemCarousel/MultiItemCarousel";
import { useDispatch, useSelector } from "react-redux";
import { getAllRestaurantsAction } from "../../../State/Customers/Restaurant/restaurant.action";
import RestaurantCard from "../../components/RestaurantCard/RestaurantCard";
import Footer from "../../components/Footer/Footer"

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
      <section className="relative flex flex-col justify-center items-center bg-cover bg-center h-[120vh] lg:h-[40vh] bg-[url('https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg')]">
        <div className="w-[50vw] text-center text-white">
          <p className="text-2xl lg:text-7xl font-bold py-5">QuickBites</p>
          <p className="text-xl lg:text-4xl text-gray-300">
            Taste the Convenience: Food, Fast and Delivered.
          </p>
        </div>
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="absolute bottom-0 w-full h-20 bg-gradient-to-t from-black"></div>
      </section>

      <section className="p-10 lg:py-10 lg:px-20">
        <p className="text-2xl font-semibold text-gray-400 py-3 pb-10">Top Meals</p>
        <MultipleItemsCarousel />
      </section>

      <section className="px-5 lg:px-20">
        <h1 className="text-2xl font-semibold text-gray-400 py-3">
          Order From Our Handpicked Favorites
        </h1>
        <div className="flex flex-wrap items-center justify-around">
          {restaurant.restaurants.map((item, i) => (
            <RestaurantCard key={i} data={item} />
          ))}
        </div>
      </section>
      <Footer></Footer>
    </div>

  );
};

export default HomePage;
