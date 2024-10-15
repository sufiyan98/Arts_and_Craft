import React from 'react';
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';


import './AdminCourse.css';
// import './UserService.js';

const fetchData = async () => {
    const res = await fetch('http://localhost:8082/course/list');
    console.log(res);
    const json = await res.json();
    console.log(json);
    return json;
}
// const fetchDeleteData = async (id) => {
//     const res = await fetch('http://localhost:8082/course/list'+id,{method:'DELETE'});
//     console.log(res);
//     const json = await res.json();
//     console.log(json);
//     return json;
// }

function AdminCourse(props) {
    let navigate = useNavigate();
    let [courseList, setCourseList, search, setSearch] = useState([]);

  useEffect(() => {
    fetchData().then(courseList => {
        setCourseList(courseList)
    })
  }, []);
  const changeSearchHandler = (event) => {
    setSearch(event.target.value);
  };

  const editCourse = (id) => {
    navigate(`updateCourse/${id}`);
  };

//   const deleteCourse = (id) => {
//     // DeleteService.deleteCourse(id).then((res) => {
//     //   setCourseList(courseList.filter((course)=> course.courseId !== id))
// //  }
//   };

     const getList = (props, list) => {
        let result = [];
        let rowCount = 1;
        let isAdmin = props.isAdmin;
        console.log(isAdmin);
        if(!list) return ;
        list.forEach(element => {
            result.push(<div class="course-info">
                <div class = "left-section"> 
                <div class="course-name">{element.name}</div>
                <div class = "course-duration">{element.duration}</div>
                <div class = "course-available-timings">{element.cst}</div>
                </div>
                <div class = "right-section"> 
                <div class = "number-of-students">Number of Students: {element.nos}</div>
                <div class = "course-description">{element.description}</div>
                <div class = "buttons">
                    <img class="edit button" src={"/icon/edit.jpg"} onClick="editCourse({element.id})" />
                    <img class="delete button" src={"/icon/delete.jpg"} onClick="deleteCourse({element.id})" />
                    {/* { isAdmin && (
                     <button class = "buttons" onClick="fetchDeleteData({element.id})"> Delete Course</button>
                )} */}
                </div>
                </div>
                </div>);
        });
        return result;
    };    
    return (
        <div> 
            <div class = "SearchBar"> <input type = "text" name = "keyword" placeholder="Type here to search course"/>
             <button class = "Search-button"> Search </button></div>
            { getList(props, courseList) }
        </div>
    );
}
export default AdminCourse;