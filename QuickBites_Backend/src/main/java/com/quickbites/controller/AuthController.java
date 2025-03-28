package com.quickbites.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.quickbites.Exception.UserException;
import com.quickbites.config.JwtProvider;
import com.quickbites.dto.ApiResponse;
import com.quickbites.dto.AuthResponse;
import com.quickbites.dto.LoginRequest;
import com.quickbites.dto.ResetPasswordRequest;
import com.quickbites.entities.Cart;
import com.quickbites.entities.PasswordResetToken;
import com.quickbites.entities.User;
import com.quickbites.entities.enums.USER_ROLE;
import com.quickbites.repository.CartRepository;
import com.quickbites.repository.UserRepository;

import com.quickbites.service.CustomeUserServiceImplementation;
import com.quickbites.service.PasswordResetTokenService;
import com.quickbites.service.UserService;

import jakarta.validation.Valid;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@RestController
@RequestMapping("/auth")
public class AuthController {

	@Autowired
	private UserRepository userRepository;
	@Autowired
	private PasswordEncoder passwordEncoder;
	@Autowired
	private JwtProvider jwtProvider;
	@Autowired
	private CustomeUserServiceImplementation customUserDetails;
	@Autowired
	private CartRepository cartRepository;
	@Autowired
	private PasswordResetTokenService passwordResetTokenService;
	@Autowired
	private UserService userService;


	@PostMapping("/signup")
	public ResponseEntity<AuthResponse> createUserHandler(@Valid @RequestBody User user) throws UserException {

		String email = user.getEmail();
		String password = user.getPassword();
		String fullName = user.getFullName();
		USER_ROLE role = user.getRole();

		User isEmailExist = userRepository.findByEmail(email);

		if (isEmailExist != null) {

			throw new UserException("Email Is Already Used With Another Account");
		}

		// Create new user
		User createdUser = new User();
		createdUser.setEmail(email);
		createdUser.setFullName(fullName);
		createdUser.setPassword(passwordEncoder.encode(password));
		createdUser.setRole(role);

		User savedUser = userRepository.save(createdUser);

		Cart cart = new Cart();
		cart.setCustomer(savedUser);
		Cart savedCart = cartRepository.save(cart);
//		savedUser.setCart(savedCart);

		List<GrantedAuthority> authorities = new ArrayList<>();

		authorities.add(new SimpleGrantedAuthority(role.toString()));

		Authentication authentication = new UsernamePasswordAuthenticationToken(email, password, authorities);
		SecurityContextHolder.getContext().setAuthentication(authentication);

		String token = jwtProvider.generateToken(authentication);

		AuthResponse authResponse = new AuthResponse();
		authResponse.setJwt(token);
		authResponse.setMessage("Register Success");
		authResponse.setRole(savedUser.getRole());

		return new ResponseEntity<>(authResponse, HttpStatus.OK);

	}

	@PostMapping("/signin")
	public ResponseEntity<AuthResponse> signin(@RequestBody LoginRequest loginRequest) {

		String username = loginRequest.getEmail();
		String password = loginRequest.getPassword();

		System.out.println(username + " ----- " + password);

		Authentication authentication = authenticate(username, password);
		SecurityContextHolder.getContext().setAuthentication(authentication);

		String token = jwtProvider.generateToken(authentication);
		AuthResponse authResponse = new AuthResponse();

		authResponse.setMessage("Login Success");
		authResponse.setJwt(token);
		Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();

		String roleName = authorities.isEmpty() ? null : authorities.iterator().next().getAuthority();

		authResponse.setRole(USER_ROLE.valueOf(roleName));

		return new ResponseEntity<AuthResponse>(authResponse, HttpStatus.OK);
	}

	private Authentication authenticate(String username, String password) {
		UserDetails userDetails = customUserDetails.loadUserByUsername(username);

		System.out.println("sign in userDetails - " + userDetails);

		if (userDetails == null) {
			System.out.println("sign in userDetails - null " + userDetails);
			throw new BadCredentialsException("Invalid username or password");
		}
		if (!passwordEncoder.matches(password, userDetails.getPassword())) {
			System.out.println("sign in userDetails - password not match " + userDetails);
			throw new BadCredentialsException("Invalid username or password");
		}
		return new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
	}
	@PostMapping("/reset-password")
	public ResponseEntity<ApiResponse> resetPassword(

			@RequestBody ResetPasswordRequest req) throws UserException {

		PasswordResetToken resetToken = passwordResetTokenService.findByToken(req.getToken());

		if (resetToken == null) {
			throw new UserException("token is required...");
		}
		if (resetToken.isExpired()) {
			passwordResetTokenService.delete(resetToken);
			throw new UserException("token get expired...");

		}

		// Update user's password
		User user = resetToken.getUser();
		userService.updatePassword(user, req.getPassword());

		// Delete the token
		passwordResetTokenService.delete(resetToken);

		ApiResponse res = new ApiResponse();
		res.setMessage("Password updated successfully.");
		res.setStatus(true);

		return ResponseEntity.ok(res);
	}

	@PostMapping("/reset-password-request")
	public ResponseEntity<ApiResponse> resetPassword(@RequestParam("email") String email) throws UserException {
		User user = userService.findUserByEmail(email);
		System.out.println("ResetPasswordController.resetPassword()");

		if (user == null) {
			throw new UserException("user not found");
		}

		userService.sendPasswordResetEmail(user);

		ApiResponse res = new ApiResponse();
		res.setMessage("Password reset email sent successfully.");
		res.setStatus(true);

		return ResponseEntity.ok(res);
	}

}
