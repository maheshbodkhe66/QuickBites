import { api } from "../../../config/api";
import { createOrderFailure, createOrderRequest, createOrderSuccess, getUsersOrdersFailure, getUsersOrdersRequest, getUsersOrdersSuccess } from "./ActionCreators";
import { GET_USERS_NOTIFICATION_FAILURE, GET_USERS_NOTIFICATION_SUCCESS } from "./ActionTypes";


export const createOrder = (reqData) => {
  return async (dispatch) => {
    dispatch(createOrderRequest());

    // Fetch JWT from LocalStorage if not in Redux
    const jwt = reqData.jwt || localStorage.getItem("jwt");

    if (!jwt) {
      console.error("JWT Token is missing!");
      alert("Authentication failed. Please log in again.");
      return;
    }

    try {
      console.log("JWT Token Being Sent:", jwt); // Log Token

      const { data } = await api.post('/api/order', reqData.order, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      console.log("Order Created Successfully:", data);

      if (data.payment_url) {
        window.location.href = data.payment_url;
      }

      dispatch(createOrderSuccess(data));
    } catch (error) {
      console.error("Order Creation Error:", error.response?.data || error);
      dispatch(createOrderFailure(error));
      alert("Failed to place order. Please try again!");
    }
  };
};


export const getUsersOrders = (jwt) => {
  return async (dispatch) => {
    dispatch(getUsersOrdersRequest());
    try {
      const {data} = await api.get(`/api/order/user`,{
        headers: {
            Authorization: `Bearer ${jwt}`,
          },
      });
      console.log("users order ",data)
      dispatch(getUsersOrdersSuccess(data));
    } catch (error) {
      dispatch(getUsersOrdersFailure(error));
    }
  };
};


export const getUsersNotificationAction = () => {
  return async (dispatch) => {
    dispatch(createOrderRequest());
    try {
      const {data} = await api.get('/api/notifications');
      console.log("all notifications ",data)
      dispatch({type:GET_USERS_NOTIFICATION_SUCCESS,payload:data});
    } catch (error) {
      console.log("error ",error)
      dispatch({type:GET_USERS_NOTIFICATION_FAILURE,payload:error});
    }
  };
};
