import React, { useEffect } from "react";
import OrdersTable from "./OrderTable";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchRestaurantsOrder } from "../../State/Admin/Order/restaurants.order.action";

const orderStatus = [
  { label: "Pending", value: "PENDING" },
  { label: "Completed", value: "COMPLETED" },
  { label: "All", value: "all" },
];

const RestaurantsOrder = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { restaurant, auth } = useSelector((store) => store);

  const decodedQueryString = decodeURIComponent(location.search);
  const searchParams = new URLSearchParams(decodedQueryString);
  const filterValue = searchParams.get("order_status");

  useEffect(() => {
    dispatch(
      fetchRestaurantsOrder({
        restaurantId: restaurant.usersRestaurant?.id,
        orderStatus: filterValue,
        jwt: auth.jwt || jwt,
      })
    );
  }, [auth.jwt, filterValue]);

  const handleFilter = (e) => {
    const searchParams = new URLSearchParams(location.search);
    const value = e.target.value;
    if (value === "all") {
      searchParams.delete("order_status");
    } else {
      searchParams.set("order_status", value);
    }
    navigate({ search: `?${searchParams.toString()}` });
  };

  return (
    <div className="p-4">
      <div className="bg-white shadow-md p-5 rounded mb-4">
        <h2 className="text-xl font-semibold pb-2">Order Status</h2>
        <div className="flex space-x-4">
          {orderStatus.map((item) => (
            <label key={item.value} className="flex items-center space-x-2">
              <input
                type="radio"
                name="category"
                value={item.value}
                checked={filterValue === item.value || (!filterValue && item.value === "all")}
                onChange={handleFilter}
                className="form-radio h-4 w-4 text-blue-600"
              />
              <span className="text-gray-700">{item.label}</span>
            </label>
          ))}
        </div>
      </div>
      <OrdersTable name={"All Orders"} />
    </div>
  );
};

export default RestaurantsOrder;