package com.quickbites.service;

import java.util.List;

import com.quickbites.entities.Notification;
import com.quickbites.entities.Order;
import com.quickbites.entities.Restaurant;
import com.quickbites.entities.User;



public interface NotificationService {
	
	public Notification sendOrderStatusNotification(Order order);
	public void sendRestaurantNotification(Restaurant restaurant, String message);
	public void sendPromotionalNotification(User user, String message);
	
	public List<Notification> findUsersNotification(Long userId);

}
