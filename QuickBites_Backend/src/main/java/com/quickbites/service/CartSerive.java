package com.quickbites.service;

import com.quickbites.Exception.CartException;
import com.quickbites.Exception.CartItemException;
import com.quickbites.Exception.FoodException;
import com.quickbites.Exception.UserException;
import com.quickbites.dto.AddCartItemRequest;
import com.quickbites.entities.Cart;
import com.quickbites.entities.CartItem;

public interface CartSerive {

	public CartItem addItemToCart(AddCartItemRequest req, String jwt) throws UserException, FoodException, CartException, CartItemException;

	public CartItem updateCartItemQuantity(Long cartItemId,int quantity) throws CartItemException;

	public Cart removeItemFromCart(Long cartItemId, String jwt) throws UserException, CartException, CartItemException;

	public Long calculateCartTotals(Cart cart) throws UserException;
	
	public Cart findCartById(Long id) throws CartException;
	
	public Cart findCartByUserId(Long userId) throws CartException, UserException;
	
	public Cart clearCart(Long userId) throws CartException, UserException;
	

	

}
