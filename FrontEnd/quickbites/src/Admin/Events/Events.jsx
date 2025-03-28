import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createEventAction,
  getRestaurnatsEvents,
} from "../../State/Customers/Restaurant/restaurant.action";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import EventCard from "./EventCard";

const initialValues = {
  image: "",
  location: "",
  name: "",
  startedAt: "",
  endsAt: "",
};

const Events = () => {
  const [formValues, setFormValues] = useState(initialValues);
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch();
  const { restaurant, auth } = useSelector((store) => store);
  const jwt = localStorage.getItem("jwt");

  const handleFormChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleDateChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: dayjs(e.target.value).format("YYYY-MM-DDTHH:mm") });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(
      createEventAction({
        data: formValues,
        restaurantId: restaurant.usersRestaurant?.id,
        jwt,
      })
    );
    setFormValues(initialValues);
    setOpenModal(false);
  };

  useEffect(() => {
    if (restaurant.usersRestaurant) {
      dispatch(
        getRestaurnatsEvents({
          restaurantId: restaurant.usersRestaurant?.id,
          jwt: auth.jwt || jwt,
        })
      );
    }
  }, [restaurant.usersRestaurant, dispatch, auth.jwt, jwt]);

  return (
    <div className="p-5">
      <button
        onClick={() => setOpenModal(true)}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg"
      >
        Create New Event
      </button>
      <div className="mt-5 flex flex-wrap gap-5">
        {restaurant.restaurantsEvents.map((item) => (
          <EventCard key={item.id} item={item} />
        ))}
      </div>

      {openModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">Create Event</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="image"
                placeholder="Image URL"
                value={formValues.image}
                onChange={handleFormChange}
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                name="location"
                placeholder="Location"
                value={formValues.location}
                onChange={handleFormChange}
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                name="name"
                placeholder="Event Name"
                value={formValues.name}
                onChange={handleFormChange}
                className="w-full p-2 border rounded"
              />
              <input
                type="datetime-local"
                name="startedAt"
                value={formValues.startedAt}
                onChange={handleDateChange}
                className="w-full p-2 border rounded"
              />
              <input
                type="datetime-local"
                name="endsAt"
                value={formValues.endsAt}
                onChange={handleDateChange}
                className="w-full p-2 border rounded"
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setOpenModal(false)}
                  className="px-4 py-2 bg-gray-400 text-white rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Events;
