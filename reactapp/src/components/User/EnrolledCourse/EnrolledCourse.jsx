import React from 'react';
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router';
import UserService from '../../../service/UserService';
import './EnrolledCourse.css';
import { toast } from "react-toastify";

export default function EnrolledCourse() {
  const [enrolledCourse, setEnrolledCourse] = useState([]);
  const [newCourse, setNewCourse] = useState([]);
  const [oldCourse, setOldCourse] = useState([]);
  const [allTab, setAllTab] = useState(true);
  const [newTab, setNewTab] = useState(false);
  const [oldTab, setOldTab] = useState(false);
  const [allCourse, setAllCourse] = useState(true);
  const [display, setDisplay] = useState(true);
  const [isLoading, setLoading] = useState(true);

  let navigate = useNavigate();
  let users = localStorage.getItem("userInformation");
  let userEmail = users.slice(1, -1);
  const loadDataOnlyOnce = () => {
    UserService.findStudentIdByEmail(userEmail).then((res) => {
       UserService.FindStudentById(res.data).then((resourse) => {
          setEnrolledCourse(resourse.data);
          setLoading(false);
       }).catch(error => {
        setEnrolledCourse([]);
        setLoading(false);
        toast.warn("No Course Enrolled Right Now !");
     });
    });
  };
  useEffect(() => {
    loadDataOnlyOnce();
  }, []);
  const viewNewCourse = () => {
    setDisplay(true);
    setAllCourse(false);
    setAllTab(false);
    setNewTab(true);
    setOldTab(false);
    setNewCourse([]);
    var date, datearray, courseEndDate, finalDate, diffDays, diffTime, today;
    enrolledCourse.map((course) => (
      date = course.endDate,
      datearray = date.split("/"),
      courseEndDate = datearray[1] + '/' + datearray[0] + '/' + datearray[2],
      finalDate =new Date(courseEndDate),
      today = new Date(),
      diffTime = (finalDate - today),
      diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)),
      console.log(diffDays),
      diffDays > 0 ? setNewCourse(newCourse => [...newCourse, course]) : null
    ))
  }
  const viewOldCourse = () => {
    setAllCourse(false);
    setDisplay(false);
    setAllTab(false);
    setNewTab(false);
    setOldTab(true);
    setOldCourse([]);
    var date, datearray, courseEndDate, finalDate, diffDays, diffTime, today;
    enrolledCourse.map((course) => (
      date = course.endDate,
      datearray = date.split("/"),
      courseEndDate = datearray[1] + '/' + datearray[0] + '/' + datearray[2],
      finalDate =new Date(courseEndDate),
      today = new Date(),
      diffTime = (finalDate - today),
      diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)),
      console.log(diffDays),
      diffDays < 0 ? setOldCourse(oldCourse => [...oldCourse, course]) : null
    ))
  }
  const myLearning = (id) => {
    navigate(`/user/myLearning/${id}`)
  }
  const viewAllCourse = () => {
    setAllCourse(true);
    setAllTab(true);
    setNewTab(false);
    setOldTab(false);
  }
  if (isLoading) {
    return <div className="App">Loading...</div>;
  }
    return (
      <div>
        <div className="tab">
          <div style={{ backgroundColor:allTab ? '#21709e' : 'white', color: allTab ? 'white' :'black' }} onClick={viewAllCourse}>All Course</div>
          <div style={{ backgroundColor:newTab ? '#21709e' : 'white', color: newTab ? 'white' :'black' }} onClick={viewNewCourse}>New Course</div>
          <div style={{ backgroundColor:oldTab ? '#21709e' : 'white', color: oldTab ? 'white' :'black' }} onClick={viewOldCourse}>Completed Course</div>
        </div>
        {allCourse ?
          <div className="courseGrid">
            {enrolledCourse?.map((course, i) => (
                <div className="courseContentGrid" key={i}>
                    <div>Course name: {course.course.courseName}</div> 
                    <div>Course joined Date: {course.joinedDate}</div>
                    <div> Course end Date: {course.endDate}</div>
                    <button onClick={() => myLearning(course.enrolledCourseId)}> My Learning </button>
                </div>
            ))}
          </div> :
          display ?
              <div className="courseGrid">
                  {newCourse?.map((course, i) => (
                      <div className="courseContentGrid" key={i}>
                          <div>Course name: {course.course.courseName}</div> 
                          <div>Course joined Date: {course.joinedDate}</div>
                          <div> Course end Date: {course.endDate}</div>
                          <button onClick={() => myLearning(course.enrolledCourseId)}> My Learning </button>
                      </div>
                  ))}
              </div>
              : 
              <div className="courseGrid">
                  {oldCourse?.map((course, i) => (
                      <div className="courseContentGrid" key={i}>
                        <div>Course name: {course.course.courseName}</div> 
                        <div>Course joined Date: {course.joinedDate}</div>
                        <div> Course end Date: {course.endDate}</div>
                        <button onClick={() => myLearning(course.enrolledCourseId)}> My Learning </button>
                      </div>
                  ))}
              </div>
        }
      </div>
    );
}