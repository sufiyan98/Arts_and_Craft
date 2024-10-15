package com.artsandcrafts.dao;

import com.springbootbidyut.springbootdemo.entity.AcademyModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AcademyRepository extends JpaRepository<AcademyModel,Integer> {
}
