package com.quickbites.service;


import com.quickbites.entities.Order;
import com.quickbites.entities.PaymentResponse;
import com.stripe.exception.StripeException;

public interface PaymentService {
	
	public PaymentResponse generatePaymentLink(Order order) throws StripeException;

}
