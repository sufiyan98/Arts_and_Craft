import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../Auth/Login/Login";
import Signup from "../Auth/Signup/Signup";
import ViewAcademy from "../User/ViewAcademy/ViewAcademy";
import AdminNavigationBar from "../Admin/AdminNavigationBar/AdminNavigationBar";
import AdminAcademy from "../Admin/AdminAcademy/AdminAcademy";
import AdminStudent from "../Admin/AdminStudent/AdminStudent";
import AdminCourse from "../Admin/AdminCourse/AdminCourse";
import AdminAddStudent from "../Admin/AdminStudent/AdminAddStudent";
import ErrorPage from "../Error Page/ErrorPage";
import AdminUpdateStudent from "../Admin/AdminStudent/AdminUpdateStudent";
import HomePage from "../Home Page/HomePage";
import AdminUpdateAcademy from "../Admin/AdminAcademy/AdminUpdateAcademy";
import AdminAddAcademy from "../Admin/AdminAcademy/AdminAddAcademy";
import AdminAddCourse from "../Admin/AdminCourse/AdminAddCourse";
import AdminUpdateCourse from "../Admin/AdminCourse/AdminUpdateCourse";
import NavigationBar from "../User/NavigationBar/NavigationBar";
import ViewCourse from "../User/ViewCourse/ViewCourse";
import StudentDetails from "../User/StudentDetails/StudentDetails";
import EnrolledCourse from "../User/EnrolledCourse/EnrolledCourse";
import MyLearing from "../User/MyLearning/MyLearing";

export default function Routing() {

  const [auth, setAuth] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [user, setUser] = useState(false);

  useEffect(() => {
    let users = localStorage.getItem("authStatus");
    users && JSON.parse(users) ? setAuth(true) : setAuth(false);
  }, []);

  useEffect(() => {
    localStorage.setItem("authStatus", auth);
    let checkAdmin = localStorage.getItem("admin");
    setAdmin(checkAdmin);
    let checkUser = localStorage.getItem("user");
    setUser(checkUser);
  }, [auth]);

    return (
      <BrowserRouter>
        <Routes>
          {!auth && (
            <>
              <Route path="/" element={<HomePage />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login authenticate={() => setAuth(true)} />} />
            </>
          )}
          { admin && (
            <>
              <Route path="admin" element={<AdminNavigationBar logout={() => setAuth(false)} />}>
              <Route path="adminAcademy" element={<AdminAcademy />} />
              <Route
                path="adminAcademy/adminAddAcademy"
                element={<AdminAddAcademy />}
              />
              <Route path="adminStudent" element={<AdminStudent />}></Route>
              <Route
                path="adminStudent/adminAddStudent"
                element={<AdminAddStudent />}
              />
              <Route
                path="adminStudent/updateStudent/:studentId"
                element={<AdminUpdateStudent />}
              />
              <Route path="adminCourse" element={<AdminCourse />} />
              <Route
                path="adminCourse/adminAddCourse"
                element={<AdminAddCourse />}
              />
              <Route
                path="adminCourse/updateCourse/:courseId"
                element={<AdminUpdateCourse />}
              />
              <Route
                path="adminAcademy/updateAcademy/:academyId"
                element={<AdminUpdateAcademy />}
              />
            </Route>    
            </>
          )}
          { user && (
            <>
              <Route path="user" element={<NavigationBar logout={() => setAuth(false)} />}>
                <Route path="viewAcademy" element={<ViewAcademy />}></Route>
                <Route path="viewCourse/:academyName" element={<ViewCourse />}></Route>
                <Route path="studentDetails" element={<StudentDetails />}></Route>
                <Route path="enrolledCourse" element={<EnrolledCourse />}></Route>
                <Route path="myLearning/:id" element={<MyLearing />}></Route>
              </Route>
            </>
          )}
          <Route path="*" element={<ErrorPage/>} />
        </Routes>
      </BrowserRouter>
  );
};    
