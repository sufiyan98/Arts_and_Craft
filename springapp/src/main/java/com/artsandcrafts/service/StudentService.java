package com.artsandcrafts.service;

import java.util.List;

import com.artsandcrafts.model.Student;
import com.artsandcrafts.request.StudentReq;

public interface StudentService {

	Student addStudent(StudentReq student);

	Student editStudent(int studentId, Student student);

	List<Student> findByFirstName(String firstName);

	List<Student> findByStudentId(int id);

	List<Student> viewStudent();

	String deleteStudent(int id);

	Boolean existsByEmailId(String emailId);

}
