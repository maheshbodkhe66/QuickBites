package com.quickbites.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.quickbites.entities.PasswordResetToken;

public interface PasswordResetTokenRepository extends JpaRepository<PasswordResetToken, Integer> {
	PasswordResetToken findByToken(String token);
}
