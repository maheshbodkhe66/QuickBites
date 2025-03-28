package com.quickbites.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.quickbites.entities.CartItem;



public interface CartItemRepository extends JpaRepository<CartItem, Long> {


//    CartItem findByFoodIsContaining

}
