package com.quickbites.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.quickbites.entities.Address;



public interface AddressRepository extends JpaRepository<Address, Long> {
	 
}
