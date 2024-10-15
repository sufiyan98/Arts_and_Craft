import React from "react";
import AcademyIcon from "../../../icon/academyIcon.png"
import CourseIcon from "../../../icon/courseIcon.png"
import StudentIcon from "../../../icon/studentIcon.png"
import LogoutIcon from "../../../icon/logoutIcon.png"
import {Link, Outlet} from 'react-router-dom'
import { Navbar, Nav } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import ".././Admin.css";

export default function AdminAcademy() {
  return (
    <div>
      <Navbar collapseOnSelect expand="lg" className="admin-nav" variant="dark">
        <Navbar.Brand href="#home">Arts and Crafts Academy</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="navbar-link" >
            <img
              alt="academy"
              src={AcademyIcon}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
            <Link to="adminAcademy">Academy</Link>
            <img
            alt="academy"
            src={CourseIcon}
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{' '}
            <Link to="adminCourse">Course</Link>
            <img
            alt="student"
            src={StudentIcon}
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{' '}
            <Link to="adminStudent">Student</Link>
          </Nav>
          <Nav className="nav-logout">
            <img
              alt="logout"
              src={LogoutIcon}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
              <Link to="/login">Logout</Link>
        </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Outlet/>
    </div>
  );
}
