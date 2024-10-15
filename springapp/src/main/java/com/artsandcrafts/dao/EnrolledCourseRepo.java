package com.artsandcrafts.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.artsandcrafts.model.EnrolledCourse;
import com.artsandcrafts.request.EnrolledCourseResponse;

public interface EnrolledCourseRepo extends JpaRepository<EnrolledCourse, Integer> {
		
	List<EnrolledCourse> findByStudent_StudentId(int studentId);
	
	@Query("SELECT new com.artsandcrafts.request.EnrolledCourseResponse(s.studentId, s.firstName, s.phoneNumber, e.enrolledCourse) FROM EnrolledCourse e JOIN e.student s GROUP BY s.studentId")
	List<EnrolledCourseResponse> getStudent();
}
