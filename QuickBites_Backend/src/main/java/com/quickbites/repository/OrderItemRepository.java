package com.quickbites.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.quickbites.entities.*;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {

}
