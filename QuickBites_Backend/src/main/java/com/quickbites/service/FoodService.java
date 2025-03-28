package com.quickbites.service;

import java.util.List;

import com.quickbites.Exception.FoodException;
import com.quickbites.Exception.RestaurantException;
import com.quickbites.dto.CreateFoodRequest;
import com.quickbites.entities.Category;
import com.quickbites.entities.Food;
import com.quickbites.entities.Restaurant;

public interface FoodService {

	public Food createFood(CreateFoodRequest req, Category category, Restaurant restaurant)
			throws FoodException, RestaurantException;

	void deleteFood(Long foodId) throws FoodException;

	public List<Food> getRestaurantsFood(Long restaurantId, boolean isVegetarian, boolean isNonveg, boolean isSeasonal,
			String foodCategory) throws FoodException;

	public List<Food> searchFood(String keyword);

	public Food findFoodById(Long foodId) throws FoodException;

	public Food updateAvailibilityStatus(Long foodId) throws FoodException;
}
