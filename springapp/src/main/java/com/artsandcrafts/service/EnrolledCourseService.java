package com.artsandcrafts.service;

import java.util.List;

import com.artsandcrafts.model.EnrolledCourse;
import com.artsandcrafts.request.EnrolledCourseResponse;
import com.artsandcrafts.request.StudentReq;

public interface EnrolledCourseService {

	EnrolledCourse addAdmission(EnrolledCourse student);

	List<EnrolledCourse> viewAdmission();

	List<EnrolledCourse> viewAdmissions(int studentId);

	List<EnrolledCourseResponse> viewAdmissionTable();

}
