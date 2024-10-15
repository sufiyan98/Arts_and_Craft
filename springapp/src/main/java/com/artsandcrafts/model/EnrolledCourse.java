package com.artsandcrafts.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import org.apache.el.parser.AstFalse;

import com.artsandcrafts.request.StudentReq;

@Entity
public class EnrolledCourse {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int enrolledCourseId;
	private String academyName;
	private String enrolledCourse;
	private String joinedDate;
	private String endDate;
	
	@ManyToOne
	@JoinColumn(name = "studentId")
    private Student student;

	public EnrolledCourse(StudentReq studentReq) {
		this.academyName = studentReq.getAcademyName();
		this.enrolledCourse = studentReq.getEnrolledCourse();
		this.joinedDate = studentReq.getJoinedDate();
		this.endDate = studentReq.getEndDate();
	}
	public EnrolledCourse() {
		super();
	}
	public Student getStudent() {
		return student;
	}
	public void setStudent(Student student) {
		this.student = student;
	}
	public int getEnrolledCourseId() {
		return enrolledCourseId;
	}
	public void setEnrolledCourseId(int enrolledCourseId) {
		this.enrolledCourseId = enrolledCourseId;
	}
	public String getAcademyName() {
		return academyName;
	}
	public void setAcademyName(String academyName) {
		this.academyName = academyName;
	}
	public String getEnrolledCourse() {
		return enrolledCourse;
	}
	public void setEnrolledCourse(String enrolledCourse) {
		this.enrolledCourse = enrolledCourse;
	}
	public String getJoinedDate() {
		return joinedDate;
	}
	public void setJoinedDate(String joinedDate) {
		this.joinedDate = joinedDate;
	}
	public String getEndDate() {
		return endDate;
	}
	public void setEndDate(String endDate) {
		this.endDate = endDate;
	}
	
}