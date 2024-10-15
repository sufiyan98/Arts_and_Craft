package com.artsandcrafts.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RestController;

import com.artsandcrafts.model.EnrolledCourse;
import com.artsandcrafts.request.EnrolledCourseResponse;
import com.artsandcrafts.request.StudentReq;
import com.artsandcrafts.service.EnrolledCourseService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/admin")
public class EnrolledCourseController {
	@Autowired
	EnrolledCourseService enrolledCourseService;
	
	@PostMapping("/addAdmission")
	public EnrolledCourse addAdmission(@RequestBody EnrolledCourse course) {
	    return enrolledCourseService.addAdmission(course);
	}
	
	@GetMapping("/viewAdmission")
	public List<EnrolledCourse> viewAdmission() {
		return enrolledCourseService.viewAdmission();
	}
	
	@GetMapping("/viewAdmissionTable")
	public List<EnrolledCourseResponse> viewAdmissionTable() {
		return enrolledCourseService.viewAdmissionTable();
	}
	
	@GetMapping("/viewAdmissionByStudentId/{studentId}")
	public List<EnrolledCourse> viewAdmissions(@PathVariable int studentId) {
		return enrolledCourseService.viewAdmissions(studentId);
	}
}
