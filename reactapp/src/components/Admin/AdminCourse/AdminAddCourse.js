import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import UserService from "../../../service/UserService";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AdminAddCourse() {
  let [academy, setAcademy] = useState([]);

  let navigation = useNavigate();

  const loadDataOnlyOnce = () => {
    UserService.viewAcademy().then((res) => {
      setAcademy(res.data);
      console.log(res.data);
    });
  };
  useEffect(() => {
    loadDataOnlyOnce();
  }, []);
  const cancel = () => {
    navigation("/admin/adminCourse");
  }
  const formik = useFormik({
    initialValues: {
      courseName: "",
      courseDuration: "",
      academyName: "",
      startTime: "",
      endTime: "",
      noOfStudents: "",
      courseDescription: "",
    },

    validationSchema: Yup.object({
      courseName: Yup.string()
        .min(3, "Enter a Valid Name")
        .max(20, "Enter a Valid Name")
        .required("Required"),
      courseDuration: Yup.string()
        .matches(/[0-9]+/, "Enter Number Only")
        .required("Enter Number"),
      academyName: Yup.string().required("Required"),
      startTime: Yup.string().required("Required"),
      endTime: Yup.string().required("Required"),
      noOfStudents: Yup.string()
        .matches(/[0-9]+/, "Enter Number Only")
        .required("Enter Number"),
      courseDescription: Yup.string()
        .min(5, "Enter a Valid Description")
        .max(200, "Enter a Valid Description")
        .required("Required"),
    }),
    onSubmit: (values) => {
      const courseDetails = {
        courseName: values.courseName,
        noOfStudents: values.noOfStudents,
        courseDuration: values.courseDuration,
        courseDescription: values.courseDescription,
        startTime: values.startTime,
        endTime: values.endTime,
        academy: {
          academyName: values.academyName
        }
      }
      UserService.addCourse(courseDetails).then((res) => {
        toast.success("New Course Added Successfully");
        formik.resetForm();
        navigation(-1);
        console.log(res.data);
      });
      console.log(values);
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <h2 className="headingAddCourse">Add Course</h2>
        <div className="MainDiv">
          <div>
            <label htmlFor="courseName">Coure Name </label>
            <input
              id="courseName"
              type="text"
              name="courseName"
              placeholder="Enter the Course Name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.courseName}
            />
            {formik.touched.courseName && formik.errors.courseName ? (
              <p>{formik.errors.courseName}</p>
            ) : null}
          </div>

          <div>
            <label htmlFor="courseDuration">Coure Duration </label>
            <input
              id="courseDuration"
              type="number"
              name="courseDuration"
              placeholder="Duration in Months"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.courseDuration}
            />
            {formik.touched.courseDuration && formik.errors.courseDuration ? (
              <p>{formik.errors.courseDuration}</p>
            ) : null}
          </div>

          <div>
            <label htmlFor="academyName">Academy Name </label>
            <select
              id="academyName"
              name="academyName"
              value={formik.values.academyName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <option value="" label="Select Academy" />
              {academy.map((academy) => (
                <option key={academy.academyId} value={academy.academyName}>
                  {academy.academyName}
                </option>
              ))}
            </select>
            {formik.touched.academyName && formik.errors.academyName ? (
              <p id="error">{formik.errors.academyName}</p>
            ) : null}
          </div>

          <div>
            <label htmlFor="startTime">Starting Time </label>
            <input
              id="startTime"
              type="time"
              name="startTime"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.startTime}
            />
            {formik.touched.startTime && formik.errors.startTime ? (
              <p>{formik.errors.startTime}</p>
            ) : null}
          </div>

          <div>
            <label htmlFor="endTime">Ending Time </label>
            <input
              id="endTime"
              type="time"
              name="endTime"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.endTime}
            />
            {formik.touched.endTime && formik.errors.endTime ? (
              <p>{formik.errors.endTime}</p>
            ) : null}
          </div>

          <div>
            <label htmlFor="noOfStudents">No of Students Enrolled </label>
            <input
              id="noOfStudents"
              type="number"
              name="noOfStudents"
              placeholder="No of Students Enrolled"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.noOfStudents}
            />
            {formik.touched.noOfStudents && formik.errors.noOfStudents ? (
              <p>{formik.errors.noOfStudents}</p>
            ) : null}
          </div>

          <div>
            <label htmlFor="courseDescription">Course Description </label>
            <input
              id="courseDescription"
              type="text"
              name="courseDescription"
              placeholder="Enter the Course Description"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.courseDescription}
            />
            {formik.touched.courseDescription &&
            formik.errors.courseDescription ? (
              <p>{formik.errors.courseDescription}</p>
            ) : null}
          </div>
          <div></div>
          <div><button id="cancel" onClick={() => cancel()}>
            Cancel
          </button></div>
          <button id="updateCourse" type="submit">
            Add Course
          </button>
        </div>
      </form>
    </div>
  );
}
