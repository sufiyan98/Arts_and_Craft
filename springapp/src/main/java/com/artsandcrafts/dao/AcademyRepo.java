package com.artsandcrafts.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


import com.artsandcrafts.model.Academy;

@Repository
public interface AcademyRepo extends JpaRepository<Academy, Integer> {
	
	List<Academy> findByAcademyName(String academyName);
	
	Academy findByAcademyId(int academyId);
}
