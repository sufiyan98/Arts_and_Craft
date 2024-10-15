package com.artsandcrafts.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.artsandcrafts.model.AuthRequest;
import com.artsandcrafts.model.User;
import com.artsandcrafts.service.UserService;
import com.artsandcrafts.util.JwtUtil;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {
	@Autowired
	UserService userservice;
	@Autowired
	JwtUtil jwtUtil;
	@Autowired
	AuthenticationManager authenticationManager;
	
	@PostMapping("/signup")
	public User saveUser(@RequestBody User user) {
	    return userservice.saveUser(user);
	}
	
	@GetMapping("/login/{username}/{password}")
	public User isUserPresent(@PathVariable String username, @PathVariable String password) {
	    return userservice.isUserPresent(username, password);
	}
	
	@GetMapping("/checkUsername/{username}")
	public String userValidation(@PathVariable String username) {
		Boolean bool = userservice.existsByUsername(username);
		if(bool)
			return "true";
		else 
			return "false";  
    }
	
	@GetMapping("/checkUserMailId/{emailId}")
	public String emailValidation(@PathVariable String emailId) {
		Boolean bool = userservice.existsByEmailId(emailId);
		if(bool)
			return "true";
		else 
			return "false";  
    }
	
	@PostMapping("/authenticate")
	public String genrateToken(@RequestBody AuthRequest authRequest) throws Exception {
		try {
			authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword()));
		} catch (Exception e) {
			throw new Exception("Invalid username/password");
		}
		return jwtUtil.generateToken(authRequest.getUsername());
	}
}
