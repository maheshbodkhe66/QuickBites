import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateOrderStatus } from "../../State/Admin/Order/restaurants.order.action";

const orderStatus = [
  { label: "Pending", value: "PENDING" },
  { label: "Completed", value: "COMPLETED" },
  { label: "Out For Delivery", value: "OUT_FOR_DELIVERY" },
  { label: "Delivered", value: "DELIVERED" },
];

const OrdersTable = ({ isDashboard, name }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { restaurantsOrder } = useSelector((store) => store);
  const [anchorElArray, setAnchorElArray] = useState([]);

  const handleUpdateOrder = (orderId, orderStatus) => {
    dispatch(updateOrderStatus({ orderId, orderStatus, jwt }));
  };

  return (
    <div className="w-full p-5 bg-blue-100 shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">{name}</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded">
          <thead>
            <tr className="bg-orange-200">
              <th className="p-2 border">Id</th>
              <th className="p-2 border">Customer</th>
              <th className="p-2 border">Price</th>
              <th className="p-2 border">Name</th>
              {!isDashboard && <th className="p-2 border">Status</th>}
              {!isDashboard && <th className="p-2 border">Update</th>}
            </tr>
          </thead>
          <tbody>
            {restaurantsOrder.orders?.map((item, index) => (
              <tr key={item.id} className="text-center border">
                <td className="p-2 border">{item.id}</td>
                <td className="p-2 border">{item.customer.email}</td>
                <td className="p-2 border">₹{item.totalAmount}</td>
                <td className="p-2 border">
                  {item.items.map((orderItem) => (
                    <p key={orderItem.food?.name}>{orderItem.food?.name}</p>
                  ))}
                </td>
                {!isDashboard && (
                  <td className="p-2 border">
                    <span
                      className={`px-2 py-1 rounded text-white ${
                        item.orderStatus === "PENDING"
                          ? "bg-blue-500"
                          : item.orderStatus === "DELIVERED"
                          ? "bg-green-500"
                          : "bg-yellow-500"
                      }`}
                    >
                      {item.orderStatus}
                    </span>
                  </td>
                )}
                {!isDashboard && (
                  <td className="p-2 border">
                    <select
                      onChange={(e) =>
                        handleUpdateOrder(item.id, e.target.value)
                      }
                      className="p-1 border rounded"
                    >
                      <option value="">Change Status</option>
                      {orderStatus.map((status) => (
                        <option key={status.value} value={status.value}>
                          {status.label}
                        </option>
                      ))}
                    </select>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdersTable;
