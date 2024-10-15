import React, { useEffect, useState } from "react";
import UserService from "../../../service/UserService";
import { Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { Rating } from "react-simple-star-rating";

export default function ViewCourse() {
  let users = localStorage.getItem("userInformation");
  let userEmail = users.slice(1, -1);
  let [course, setCourse] = useState([]);
  let [search, setSearch] = useState("");
  let navigate = useNavigate();
  const params = useLocation();
  const loadDataOnlyOnce = () => {
    UserService.findCourseByAcademyName(params.state.academyId).then((res) => {
      setCourse(res.data);
    });
  };
  useEffect(() => {
    loadDataOnlyOnce();
  }, []);
  const changeSearchHandler = (event) => {
    setSearch(event.target.value);
  };
  const findCourse = () => {
    if (search === "") {
      UserService.findCourseByAcademyName(params.state.academyId).then((res) => {
        setCourse(res.data);
      });
    } else {
      UserService.findCourseByName(search).then((res) => {
        setCourse(res.data);
      });
    }
  };
  const enrollCourse = (courseId, duration) => {
    let d = new Date();
    let date = d.getDate();
    let month = ("0" + (d.getMonth() + 1)).slice(-2);
    let year = d.getFullYear();
    let joinedDate = date + "/" + month + "/" + year;

    let joinDate = new Date();
    let d2 = new Date();
    d2.setMonth(joinDate.getMonth() + duration);
    d2.setDate(joinDate.getDate());
    let date2 = d2.getDate();
    let month2 = ("0" + (d2.getMonth() + 1)).slice(-2);
    let year2 = d2.getFullYear();
    let endDate = date2 + "/" + month2 + "/" + year2;

    UserService.checkStudentMailId(userEmail).then((res) => {
      if (!res.data) {
        toast.warn("Add your personal details !");
        navigate("/user/studentDetails");
      } else {
        UserService.checkAdmission(userEmail, courseId).then((resource)=> {
          console.log(resource.data)
          if(!resource.data) {
            var enrollCourse = {
              enrolledCourses: [
                {
                  course:{
                    courseId: courseId
                  },
                  joinedDate: joinedDate,
                  endDate: endDate,
                },
              ],
            };
            UserService.addAdmission(userEmail, enrollCourse).then((reso) => {
              toast("New course enrolled sucessfully");
              navigate("/user/enrolledCourse");
            });
          }else {
            toast.warn("You have already enrolled this course!")
          }

        });
      }
    });
  };
  return (
    <div>
      <div className="searchBar">
        <input
          className="courseCearch"
          type="text"
          placeholder="Type here to search Course"
          value={search}
          onChange={changeSearchHandler}
        />
        <input
          id="userCourseSearch"
          type="submit"
          value="Search"
          onClick={() => findCourse()}
        />
      </div>
      <div className="courseGrid">
        {course.map((course, i) => (
          <React.Fragment key={i}>
            <Card className="courseElement" key={i}>
              <Card.Title className="courseCardTitle">
                {course.courseName}
              </Card.Title>
              <Card.Body className="courseCardGrid">
                <Card.Title>Academy Name : </Card.Title>
                <Card.Text>{course.academy.academyName}</Card.Text>
                <Card.Title>Course Duration :</Card.Title>
                <Card.Text>{course.courseDuration}</Card.Text>
                <Card.Title>Available Timing :</Card.Title>
                <Card.Text>
                  {course.startTime} to {course.endTime}
                </Card.Text>
                <Card.Title>No of Students Enrolled :</Card.Title>
                <Card.Text>{course.noOfStudents}</Card.Text>
                <Card.Title>Description :</Card.Title>
                <Card.Text>{course.courseDescription}</Card.Text>
                <div>
                  <div className='rating'>
                  <Rating
                    initialValue={course.rating}
                    fillColorArray={['#f17a45', '#f19745', '#f1a545', '#f1b345', '#f1d045']}
                    allowHalfIcon
                    readonly={course.rating > 0 || course.rating === 0}
                    allowHover={false}
                  />
                  </div>
                </div>
                <input
                  id="enrollCourse"
                  type="button"
                  value="Enroll Course"
                  onClick={() => enrollCourse(course.courseId, course.courseDuration)}
                />
              </Card.Body>
            </Card>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
