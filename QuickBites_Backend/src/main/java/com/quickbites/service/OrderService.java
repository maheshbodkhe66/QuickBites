package com.quickbites.service;

import java.util.List;

import com.quickbites.Exception.CartException;
import com.quickbites.Exception.OrderException;
import com.quickbites.Exception.RestaurantException;
import com.quickbites.Exception.UserException;
import com.quickbites.dto.CreateOrderRequest;
import com.quickbites.entities.Order;
import com.quickbites.entities.PaymentResponse;
import com.quickbites.entities.User;
import com.stripe.exception.StripeException;

public interface OrderService {
	
	 public PaymentResponse createOrder(CreateOrderRequest order, User user) throws UserException, RestaurantException, CartException, StripeException;
	 
	 public Order updateOrder(Long orderId, String orderStatus) throws OrderException;
	 
	 public void cancelOrder(Long orderId) throws OrderException;
	 
	 public List<Order> getUserOrders(Long userId) throws OrderException;
	 
	 public List<Order> getOrdersOfRestaurant(Long restaurantId,String orderStatus) throws OrderException, RestaurantException;
	 

}
