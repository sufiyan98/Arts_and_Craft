package com.artsandcrafts.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.artsandcrafts.dao.UserRepo;
import com.artsandcrafts.model.User;

@Service
public class UserServiceImpl implements UserService {

	@Autowired
	private UserRepo userRepo;
	
	@Override
	public User saveUser(User user) {
		return userRepo.save(user);
	}
	
	@Override
	public User isUserPresent(String username, String password) {
		return userRepo.findByUsernameAndPassword(username, password);
	}

	@Override
	public Boolean existsByEmailId(String emailId) {
		return userRepo.existsByEmail(emailId);
	}

	@Override
	public Boolean existsByUsername(String username) {
		return userRepo.existsByUsername(username);
	}

}
