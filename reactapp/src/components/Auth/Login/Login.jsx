import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import "../Auth.css";
import UserService from "../../../service/UserService";
import { toast } from "react-toastify";

export default function Login( {authenticate} ) {
  let navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .required("User Name is Required"),
      password: Yup.string()
        .required("Password is Required")
        .min(8, "Password is too short !")
        .max(12, "Password should not max 12 character"),
    }),
    onSubmit: (values) => {
      localStorage.setItem('token', "");
      UserService.authenticateUser(values).then((res) => {
        localStorage.setItem('token', res.data);
        UserService.login(values.username, values.password).then((res) => {
          localStorage.setItem("userInformation", JSON.stringify(res.data.email));
          authenticate();
          if (res.data.userRole === "admin") {
            localStorage.setItem("admin", true);
            toast.success("Welcome back...");
            navigate("/admin/adminAcademy");
          } else if (res.data.userRole === "user") {
            localStorage.setItem("user", true);
            toast.success("Welcome back...");
            navigate("/user/viewAcademy");
          }
        });
      }
      ).catch(error => {
        toast.warn("Invalid Credentials");
     });
    },
  });
  return (
    <div className="login">
      <div className="login-heading">
        <div className="login-grid">
          <div className="login-left">
            <h1 className="welcome-login">Arts and Crafts Academy</h1>
            <img
              className="login-img"
              src="\images/8.jpg"
              alt="signup img"
            />
          </div>
          <div className="login-right">
            <h1 className="login-h">Login</h1>
            <form onSubmit={formik.handleSubmit}>
              <div>
                <label htmlFor="username">User Name</label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.username}
                />
                {formik.touched.username && formik.errors.username ? (
                  <div className="error">{formik.errors.username}</div>
                ) : null}
              </div>
              <div>
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                />
                {formik.touched.password && formik.errors.password ? (
                  <div className="error">{formik.errors.password}</div>
                ) : null}
              </div>
              <div className="signup-text">
                Are you new user? <Link to="/signup">Signup</Link>{" "}
              </div>
              <button id="loginButton" type="submit">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
