package com.artsandcrafts.service;

import java.util.List;
import java.util.Objects;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.artsandcrafts.dao.EnrolledCourseRepo;
import com.artsandcrafts.dao.StudentRepo;
import com.artsandcrafts.model.EnrolledCourse;
import com.artsandcrafts.model.Student;
import com.artsandcrafts.request.StudentReq;

@Service
public class StudentServiceImpl implements StudentService {
	@Autowired
	StudentRepo studentRepo;
	
	@Autowired
	EnrolledCourseRepo enrolledCourseRepo;
	
	@Override
	public Student addStudent(StudentReq studentReq) {
		
		Student student = new Student(studentReq);
		student = studentRepo.save(student);
		
		//EnrolledCourse courseReq = new EnrolledCourse(studentReq);
		EnrolledCourse course = new EnrolledCourse();
		course.setAcademyName(studentReq.getAcademyName());
		course.setEnrolledCourse(studentReq.getEnrolledCourse());
		course.setJoinedDate(studentReq.getJoinedDate());
		course.setEndDate(studentReq.getEndDate());
		course.setStudent(student);
		enrolledCourseRepo.save(course);
		
		return student;
		
	}

	@Override
	public Student editStudent(int studentId, Student student) {
		
		Student editStud = studentRepo.findById(studentId);

        if(Objects.nonNull(student.getAge())&&
                !"".equalsIgnoreCase(student.getAge()))
        {  editStud.setAge(student.getAge());
        }
        if(Objects.nonNull(student.getAreaName())&&
                !"".equalsIgnoreCase(student.getAreaName()))
        {  editStud.setAreaName(student.getAreaName());
        }
        if(Objects.nonNull(student.getEmailId())&&
                !"".equalsIgnoreCase(student.getEmailId()))
        {  editStud.setEmailId(student.getEmailId());
        }
        if(Objects.nonNull(student.getFatherName())&&
                !"".equalsIgnoreCase(student.getFatherName()))
        {  editStud.setFatherName(student.getFatherName());
        }
        if(Objects.nonNull(student.getGender())&&
                !"".equalsIgnoreCase(student.getGender()))
        {  editStud.setGender(student.getGender());
        }

        if(Objects.nonNull(student.getFirstName())&&
                !"".equalsIgnoreCase(student.getFirstName()))
        {  editStud.setFirstName(student.getFirstName());
        }

        if(Objects.nonNull(student.getHouseNo())&&
                !"".equalsIgnoreCase(student.getHouseNo()))
        {  editStud.setHouseNo(student.getHouseNo());
        }
        if(Objects.nonNull(student.getLastName())&&
                !"".equalsIgnoreCase(student.getLastName()))
        {  editStud.setLastName(student.getLastName());
        }

        if(Objects.nonNull(student.getMotherName())&&
                !"".equalsIgnoreCase(student.getMotherName()))
        {  editStud.setMotherName(student.getMotherName());
        }

        if(Objects.nonNull(student.getNationality())&&
                !"".equalsIgnoreCase(student.getNationality()))
        {  editStud.setNationality(student.getNationality());
        }

        if(Objects.nonNull(student.getPhoneNumber())&&
                !"".equalsIgnoreCase(student.getPhoneNumber()))
        {  editStud.setPhoneNumber(student.getPhoneNumber());
        }
        if(Objects.nonNull(student.getAlternativeNumber())&&
                !"".equalsIgnoreCase(student.getAlternativeNumber()))
        {  editStud.setAlternativeNumber(student.getAlternativeNumber());
        }
        if(Objects.nonNull(student.getPincode())&&
                !"".equalsIgnoreCase(student.getPincode()))
        {  editStud.setPincode(student.getPincode());
        }
        if(Objects.nonNull(student.getState())&&
                !"".equalsIgnoreCase(student.getState()))
        {  editStud.setState(student.getState());
        }
        if(Objects.nonNull(student.getStreetName())&&
                !"".equalsIgnoreCase(student.getStreetName()))
        {  editStud.setStreetName(student.getStreetName());
        }
        return studentRepo.save(editStud);
	}

	@Override
	public List<Student> findByFirstName(String firstName) {
		return studentRepo.findByFirstName(firstName);
	}

	@Override
	public List<Student> findByStudentId(int id) {
		return studentRepo.findByStudentId(id);
	}

	@Override
	public List<Student> viewStudent() {
		return studentRepo.findAll();
	}

	@Override
	public String deleteStudent(int id) {
		studentRepo.deleteById(id);
		return "Deleted id " + id;
	}

	@Override
	public Boolean existsByEmailId(String emailId) {
		return studentRepo.existsByEmailId(emailId);
	}
	
}
