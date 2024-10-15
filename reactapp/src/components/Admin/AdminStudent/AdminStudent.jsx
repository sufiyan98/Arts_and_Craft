import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import UserService from "../../../service/UserService";
import { Link, useNavigate } from "react-router-dom";
import "../../Admin/App.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminStudent = () => {
  let navigate = useNavigate();
  let [studentList, setStudentList] = useState([]);
  let [search, setSearch] = useState("");

  const loadDataOnlyOnce = () => {
    UserService.viewStudent().then((res) => {
      setStudentList(res.data);
      console.log(res.data);
    });
  };
  useEffect(() => {
    loadDataOnlyOnce();
  }, []);
  const changeSearchHandler = (event) => {
    setSearch(event.target.value);
  };
  const findStudent = () => {
    if (search === "") {
      UserService.viewStudent().then((res) => {
        setStudentList(res.data);
        console.log(res.data);
      });
    } else {
      UserService.FindStudentByName(search).then((res) => {
        setStudentList(res.data);
      });
    }
  };
  const editStudent = (id) => {
    navigate(`updateStudent/${id}`);
  };
  const deleteStudent = (id) => {
    UserService.deleteStudent(id).then((res) => {
      toast.success("Student ID " + id + " Deleted Sucessfully");
      setStudentList(studentList.filter((student) => student.studentId !== id));
    });
  };
  return (
    <div>
      <div>
        <div className="searchStud">
          <input
            className="search"
            type="text"
            placeholder="Type here to search Student"
            value={search}
            onChange={changeSearchHandler}
          />
          <input
            id="studentSearch"
            type="submit"
            value="Search"
            onClick={() => findStudent()}
          />
        </div>
        <table>
          <thead>
            <tr>
              <th>Student ID</th>
              <th>Student Name</th>
              <th>Enrolled Course</th>
              <th>Mobile Number</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="studentList">
            {studentList?.map((list, i) => (
            <React.Fragment key={i}>
              <tr key={i}>
                <td> {list.studentId} </td>
                <td> {list.firstName}</td>
                <td>
                {
                  list.enrolledCourses.map((enCourse, index) => [
                    index > 0 && ", ",
                    <span key={index}>
                      {enCourse.course.courseName}
                    </span>
                  ])}
                  </td>
                <td> {list.phoneNumber}</td>
                <td>
                  <Button
                    id="adminEditStudent"
                    onClick={() => editStudent(list.studentId)}
                  >
                    Edit
                  </Button>
                  <Button
                    id="adminDeleteStudent"
                    onClick={() => deleteStudent(list.studentId)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default AdminStudent;
