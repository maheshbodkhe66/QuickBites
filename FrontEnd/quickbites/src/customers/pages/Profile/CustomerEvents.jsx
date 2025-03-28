import React, { useEffect } from 'react';
import { getAllEvents } from '../../../State/Customers/Restaurant/restaurant.action';
import { useDispatch, useSelector } from 'react-redux';
import EventCard from '../../../Admin/Events/EventCard';

const CustomerEvents = () => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { restaurant, auth } = useSelector(store => store);

  useEffect(() => {
    dispatch(getAllEvents({ jwt }));
  }, [dispatch, auth.jwt]);

  return (
    <div className="mt-5 px-5 flex flex-wrap gap-5">
      {restaurant.events.map((item, index) => (
        <EventCard key={index} isCustomer={true} item={item} />
      ))}
      <h1>Event card here </h1>
    </div>
  );
};

export default CustomerEvents;
