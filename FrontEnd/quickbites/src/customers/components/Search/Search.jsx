import React, { useState } from "react";
import { topMeels } from "../../../Data/topMeels";
import { PopularCuisines } from "./PopularCuisines";
import SearchDishCard from "./SearchDishCard";
import { useDispatch, useSelector } from "react-redux";
import { searchMenuItem } from "../../../State/Customers/Menu/menu.action";

const Search = () => {
  const dispatch = useDispatch();
  const { menu, auth } = useSelector((store) => store);
  const jwt = localStorage.getItem("jwt");

  const handleSearchMenu = (keyword) => {
    dispatch(searchMenuItem({ keyword, jwt: auth.jwt || jwt }));
  };

  return (
    <div className="px-5 lg:px-[18vw]">
      {/* Search Input */}
      <div className="relative py-5">
        <svg
          className="absolute top-1/2 left-3 transform -translate-y-1/2 w-6 h-6 text-gray-100"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.2-5.2M15 10a5 5 0 11-10 0 5 5 0 0110 0z"
          />
        </svg>
        <input
          onChange={(e) => handleSearchMenu(e.target.value)}
          className="p-3 pl-12 w-full bg-blue-100 text-black rounded-md outline-none"
          type="text"
          placeholder="Search food..."
        />
      </div>

      {/* Popular Cuisines */}
      <div>
        <h1 className="py-5 text-2xl font-semibold">Popular Cuisines</h1>
        <div className="flex flex-wrap gap-4">
          {topMeels.slice(0, 9).map((item, index) => (
            <PopularCuisines key={index} image={item.image} title={item.title} />
          ))}
        </div>
      </div>

      {/* Search Results */}
      <div className="mt-7">
        {menu.search.length > 0 ? (
          menu.search.map((item, index) => <SearchDishCard key={index} item={item} />)
        ) : (
          <p className="text-center text-gray-400">No items found</p>
        )}
      </div>
    </div>
  );
};

export default Search;
