import React from 'react';
import { useEffect, useState } from "react";


import './ViewAdmission.css';


const fetchData = async () => {
    const res = await fetch('http://localhost:8082/user/viewAdmission');
    
    console.log(res);
    
    const json = await res.json();
    console.log(json);
   
    return json;
}
const fetchMyLearning = async (id) => {
    const res = await fetch('http://localhost:8082/user/viewAdmission'+id,{method:'GET'});
    console.log(res);
    const json = await res.json();
    console.log(json);
    return json;
}

function ViewAdmission(props) {
    const [courseList, setCourseList] = useState([])

  useEffect(() => {
    fetchData().then(courseList => {
        setCourseList(courseList)
    })
  }, []);

     const getList = (props, list) => {
        let result = [];
        let rowCount = 1;
        if(!list) return ;
        list.forEach(element => {
            result.push(<div class="course-info">
                <div class="course-name">Course name: {element.name}</div> 
                <div class = "course-join">Course joined Date: {element.join}</div>
                <div class = "course-end"> Course end Date: {element.end}</div>
                <button class = "buttons" onClick ="fetchMyLearning({element.id})"> My Learning </button>
                
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
export default ViewAdmission;