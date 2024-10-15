package com.artsandcrafts.service;

import java.util.List;
import java.util.Objects;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.artsandcrafts.dao.AcademyRepo;
import com.artsandcrafts.dao.CourseRepo;
import com.artsandcrafts.dao.EnrolledCourseRepo;
import com.artsandcrafts.model.Academy;
import com.artsandcrafts.model.Course;
import com.artsandcrafts.model.EnrolledCourse;

@Service
public class CourseServiceImpl implements CourseService {
	@Autowired
	CourseRepo courseRepo;
	@Autowired
	AcademyRepo academyRepo;
	@Autowired
	EnrolledCourseRepo enrolledCourseRepo;
	
	@Override
	public Course addNewCourse(Course course) {
		Academy academy = academyRepo.findByAcademyName(course.getAcademy().getAcademyName());
		course.setAcademy(academy);
		return courseRepo.save(course);
	}

	@Override
	public String deleteCourse(int id) {
		List<EnrolledCourse> course = enrolledCourseRepo.findByCourseCourseId(id);
		enrolledCourseRepo.deleteAll(course);
		courseRepo.deleteById(id);
		return "Deleted id "+id;
	}

    

}
