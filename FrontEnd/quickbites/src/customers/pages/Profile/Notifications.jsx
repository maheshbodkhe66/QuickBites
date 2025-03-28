import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsersNotificationAction } from "../../../State/Customers/Orders/Action";

const Notifications = () => {
  const dispatch = useDispatch();
  const { order } = useSelector((store) => store);

  useEffect(() => {
    dispatch(getUsersNotificationAction());
  }, [dispatch]);

  return (
    <div className="space-y-5 px-5 lg:px-20">
     { console.log("inside notification")}
      <h1 className="py-5 font-bold text-2xl text-center">Notifications</h1>
      {order.notifications.map((item, index) => (
        <div key={index} className="p-5 border border-gray-300 rounded-lg shadow-md">
          <p>{item.message}</p>
        </div>
      ))}
    </div>
  );
};

export default Notifications;
