package com.artsandcrafts.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.artsandcrafts.model.User;

@Repository
public interface UserRepo extends JpaRepository<User, String> {
	
	User findByEmailAndPassword (String email, String password);
	
	Boolean existsByEmail(String email);

	User findByUsername(String username);

	Boolean existsByUsername(String username);

	User findByUsernameAndPassword(String username, String password);

}
