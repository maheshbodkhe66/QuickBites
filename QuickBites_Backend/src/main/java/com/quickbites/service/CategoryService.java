package com.quickbites.service;

import java.util.List;

import com.quickbites.Exception.RestaurantException;
import com.quickbites.entities.Category;


public interface CategoryService {
	
	public Category createCategory (String name,Long userId) throws RestaurantException;
	public List<Category> findCategoryByRestaurantId(Long restaurantId) throws RestaurantException;
	public Category findCategoryById(Long id) throws RestaurantException;

}
