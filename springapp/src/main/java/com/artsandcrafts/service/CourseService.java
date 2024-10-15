package com.artsandcrafts.service;

import com.artsandcrafts.model.Course;

import java.util.List;

public interface CourseService {
    
    public Course addNewCourse(Course course);

    public List<Course> getAll();

    public String deleteCourse(int id);
}
