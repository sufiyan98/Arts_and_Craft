import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import UserService from "../../../service/UserService";
import PersonalInfoImg from "../../../icon/personalInfo.png"
import LocationlInfoImg from "../../../icon/locationImg.png"
import CourselInfoImg from "../../../icon/courseImg.png"
import { useNavigate } from "react-router-dom";

const AdminAddStudent = () => {

  let navigation = useNavigate();

  let [course, setCourse] = useState([]);
  let [academy, setAcademy] = useState([]);
  let [courseDuration, setCourseDuration] = useState("");
  let [courseEndDate, setCourseEndDate] = useState("");
  let [courseJoinDate, setCourseJoinDate] = useState("");
  let [disable, setDisable] = useState(true);
  let [disableDate, setDisableDate] = useState(true);
  
  const academyNameChange = (e) => {
    if(e.target.value === "") {
      setDisable(true)
      setDisableDate(true)
    }else {
      UserService.findCourseByAcademyName(e.target.value).then((res) => {
        setCourse(res.data);
        console.log(res.data[0]);
      });
      setDisable(false)
      setDisableDate(true)
      setCourseEndDate("");
    }
  }
  const dateChange = (e) => {
    let joinDate = new Date(e);
    console.log(e)
    let d2 = new Date();
    d2.setMonth(joinDate.getMonth() + courseDuration);
    d2.setDate(joinDate.getDate())
    let date2 = d2.getDate();
    let month2 = ("0" + (d2.getMonth() + 1)).slice(-2)
    let year2 = d2.getFullYear();
    let end = date2 + ' / ' + month2 + ' / ' + year2;
    setCourseEndDate(end);
    setCourseJoinDate(joinDate);
  }
 
  const courseNameChange = (e) => {
    if(e.target.value !== "") {
      UserService.findCourseByName(e.target.value).then((res) => {
        setCourseDuration(res.data[0].courseDuration);
        setDisableDate(false);
      });
    }
  }
  const loadDataOnlyOnce = () => {
    UserService.viewAcademy().then((res) => {
      setAcademy(res.data);
      console.log(res.data);
    });
  };
  useEffect(() => {
    loadDataOnlyOnce();
  }, []);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      gender: "",
      fatherName: "",
      motherName: "",
      phoneNumber: "",
      alternativeNumber: "",
      emailId: "",
      age: "",
      houseNo: "",
      streetName: "",
      areaName: "",
      nationality: "",
      state: "",
      pincode: "",
      academyName: "",
      enrolledCourse:"",
      joinedDate:"",
      endDate:""
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .min(3, "Must be between 2 to 15 Character")
        .max(15, "Must be between 2 to 15 Character")
        .required("First Name Required"),
      lastName: Yup.string()
        .min(1, "Must be between 1 to 15 Character")
        .max(15, "Must be between 1 to 15 Character")
        .required("Last Name is Required"),
      gender: Yup.string()
        .required("Gender is required"),
      fatherName: Yup.string()
        .min(3, "Must be between 2 to 15 Characte")
        .max(20, "Must be between 2 to 15 Character")
        .required("Father Name is Required"),
      motherName: Yup.string()
        .min(3, "Must be between 2 to 15 Characte")
        .max(20, "Must be between 2 to 15 Character")
        .required("Mother name is required"),
      phoneNumber: Yup.string()
        .min(10, "Enter a valid Phone number")
        .max(10, "Enter a valid Phone number")
        .required("Phone number is required"),
      alternativeNumber: Yup.string()
        .min(10, "Enter a valid Phone number")
        .max(10, "Enter a valid Phone number")
        .required("Alternative phone number is required"),
      emailId: Yup.string().email("Invalid Email Id").required("Email Required"),
      age: Yup.string().max(2, "Enter a valid Age").required("Age Required"),
      houseNo: Yup.string()
        .min(3, "Minimum 3 Character required" )
        .max(15, "Must be less than 15 Character")
        .required("House No. is required"),
      streetName: Yup.string()
        .min(3, "Enter a Valid Street Name")
        .max(20, "Must be less than 20 Character")
        .required("Street Name Required"),
      areaName: Yup.string()
        .min(3, "Enter a Valid Area Name")
        .max(20, "Must be less than 20 Character")
        .required("Area Name Required"),
      nationality: Yup.string()
        .min(3, "Enter a valid Nationality")
        .max(20, "Must be less than 20 Character")
        .required("Nationality Required"),
      state: Yup.string()
        .min(3, "Enter a Valid State")
        .max(20, "Must be less than 20 Character")
        .required("State Required"),
      pincode: Yup.string()
        .min(4, "Enter a Valid Pincode")
        .matches(/[0-9]{6}/, "Pincode contains only number" )
        .required("Pincode Required"),
      enrolledCourse: Yup.string()
        .required("Select Course"),
      academyName: Yup.string()
        .required("Select Academy"),
      joinedDate: Yup.string()
        .required("Select Joining Date")
    }),
    onSubmit: (values) => {
      let d = new Date(formik.values.joinedDate)
      let date = d.getDate();
      let month = ("0" + (d.getMonth() + 1)).slice(-2)
      let year = d.getFullYear();
      let fullDate = date + ' / ' + month + ' / ' + year;
      formik.values.joinedDate = fullDate;
      formik.values.endDate = courseEndDate;
      console.log(formik.values);
      UserService.AddStudent(values).then((res) => {
        let admission = {
          studentId: res.data.studentId,
          enrolledCourse: values.enrolledCourse,
          academyName: values.academyName,
          joinedDate: values.joinedDate,
          endDate: courseEndDate
        };
        alert("New Student added Successfully !");
        console.log(admission)
        UserService.addAdmission(admission).then((resourse) => {
          alert("New Admission added Successfully !");
          formik.resetForm();
          navigation(-1);
        });
      });
    }
  });
  return (
    <div className="container">
      <form onSubmit={formik.handleSubmit}>
        <div className="personalInfo">
          <div className="personalInfo-left">
            <h1 className="title">Personal Information</h1>
            <img className="personalInfoImg" src={PersonalInfoImg} alt="" />
          </div>
          <div className="personalInfoContainer">
            <div>
              <label htmlFor="firstName">First Name </label>
              <input
                id="firstName"
                type="text"
                name="firstName"
                placeholder="Enter your first name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.firstName}
              />
              {formik.touched.firstName && formik.errors.firstName ? (
                <p id="error">{formik.errors.firstName}</p>
              ) : null}
            </div>

            <div>
              <label htmlFor="lastName">Last Name </label>
              <input
                id="lastName"
                type="text"
                name="lastName"
                placeholder="Enter your last name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.lastName}
              />
              {formik.touched.lastName && formik.errors.lastName ? (
                <p id="error">{formik.errors.lastName}</p>
              ) : null}
            </div>
            <div className="genderDiv">
              <label htmlFor="gender">Gender </label>
              <select
                id="gender"
                name="gender"
                value={formik.values.gender}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}> 
                <option value="" label="Gender" />
                <option value="Male" label="Male" />
                <option value="Female" label="Female" />
              </select>
              {formik.touched.gender && formik.errors.gender ? (
                <p id="error">{formik.errors.gender}</p>
              ) : null}
            </div>

            <div>
              <label htmlFor="fatherName">Father Name </label>
              <input
                id="fatherName"
                type="text"
                name="fatherName"
                placeholder="Enter your father name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.fatherName}
              />
              {formik.touched.fatherName && formik.errors.fatherName ? (
                <p id="error">{formik.errors.fatherName}</p>
              ) : null}
            </div>

            <div>
              <label htmlFor="motherName">Mother Name </label>
              <input
                id="motherName"
                type="text"
                name="motherName"
                placeholder="Enter your mother name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.motherName}
              />
              {formik.touched.motherName && formik.errors.motherName ? (
                <p id="error">{formik.errors.motherName}</p>
              ) : null}
            </div>

            <div>
              <label htmlFor="phoneNumber">Phone no </label>
              <input
                id="phoneNumber1"
                type="text"
                pattern="\d*"
                name="phoneNumber"
                placeholder="Enter phone number"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.phoneNumber}
              />
              {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
                <p id="error">{formik.errors.phoneNumber}</p>
              ) : null}
            </div>

            <div>
              <label htmlFor="alternativeNumber">Alternate Phone No </label>
              <input
                id="phoneNumber2"
                type="text"
                pattern="\d*"
                name="alternativeNumber"
                placeholder="Enter alternate number"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.alternativeNumber}
              />
              {formik.touched.alternativeNumber &&
              formik.errors.alternativeNumber ? (
                <p id="error">{formik.errors.alternativeNumber}</p>
              ) : null}
            </div>

            <div>
              <label htmlFor="emailId">Email Id </label>
              <input
                id="emailId"
                type="email"
                name="emailId"
                placeholder="Enter your Email Id"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.emailId}
              />
              {formik.touched.emailId && formik.errors.emailId ? (
                <p id="error">{formik.errors.emailId}</p>
              ) : null}
            </div>

            <div>
              <label htmlFor="age">Age </label>
              <input
                id="age"
                type="text"
                pattern="\d*"
                name="age"
                placeholder="Enter your age"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.age}
              />
              {formik.touched.age && formik.errors.age ? (
                <p id="error">{formik.errors.age}</p>
              ) : null}
            </div>
          </div>
        </div>
        
        <div className="addressInfo">
          <div className="addressInfo-left">
            <h1 className="title">Address Information</h1>
            <img className="addressInfoImg" src={LocationlInfoImg} alt="" />
          </div>
          <div className="addressInfoContainer">
          <div>
            <label htmlFor="houseNo">House no </label>
            <input
              id="houseNo"
              type="text"
              name="houseNo"
              placeholder="Enter house no"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.houseNo}
            />
            {formik.touched.houseNo && formik.errors.houseNo ? (
              <p id="error">{formik.errors.houseNo}</p>
            ) : null}
          </div>

          <div>
            <label htmlFor="streetName">Street Name </label>
            <input
              id="streetName"
              type="text"
              name="streetName"
              placeholder="Enter street name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.streetName}
            />
            {formik.touched.streetName && formik.errors.streetName ? (
              <p id="error">{formik.errors.streetName}</p>
            ) : null}
          </div>

          <div>
            <label htmlFor="areaName">Area Name </label>
            <input
              id="areaName"
              type="text"
              name="areaName"
              placeholder="Enter area name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.areaName}
            />
            {formik.touched.areaName && formik.errors.areaName ? (
              <p id="error">{formik.errors.areaName}</p>
            ) : null}
          </div>

          <div>
            <label htmlFor="nationality">Nationality </label>
            <input
              id="nationality"
              type="text"
              name="nationality"
              placeholder="Enter your nationality"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.nationality}
            />
            {formik.touched.nationality && formik.errors.nationality ? (
              <p id="error">{formik.errors.nationality}</p>
            ) : null}
          </div>

          <div>
            <label htmlFor="state">State </label>
            <input
              id="state"
              type="text"
              name="state"
              placeholder="Enter state"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.state}
            />
            {formik.touched.state && formik.errors.state ? (
              <p id="error">{formik.errors.state}</p>
            ) : null}
          </div>

          <div>
            <label htmlFor="pincode">Pincode </label>
            <input
              id="pincode"
              type="text"
              pattern="\d*"
              name="pincode"
              placeholder="Enter your pincode"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.pincode}
            />
            {formik.touched.pincode && formik.errors.pincode ? (
              <p id="error">{formik.errors.pincode}</p>
            ) : null}
          </div>
          </div>
        </div>
        <div className="courseInfo">
          <div className="courseInfo-left">
            <h1 className="title">course Information</h1>
            <img className="courseInfoImg" src={CourselInfoImg} alt="" />
          </div>
          <div className="courseInfoContainer">
            <div>
            <label htmlFor="academyName">Academy Name</label>
              <select
                id="academyName"
                name="academyName"
                value={formik.values.academyName}
                onChange={formik.handleChange}
                onClick={(academyName) => academyNameChange(academyName)}
                onBlur={formik.handleBlur}>
                <option value="" label="Select Academy"/>
                {
                  academy.map(academy =>
                    <option key={academy.academyId} value={academy.academyName}>{academy.academyName}</option>
                  )
                }
              </select>
              {formik.touched.academyName && formik.errors.academyName ? (
                <p id="error">{formik.errors.academyName}</p>
              ) : null}
            </div>

            <div>
              <label htmlFor="enrolledCourse">Enrolling Course Name</label>
              <select
                id="enrolledCourse"
                name="enrolledCourse"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                onClick={(enrolledCourse) => courseNameChange(enrolledCourse)}
                value={formik.values.enrolledCourse}
                disabled ={disable}>
                <option value="" label="Select Course"/>
                {
                  course.map(course =>
                    <option key={course.courseId} value={course.courseName}>{course.courseName}</option>
                  )
                }
              </select>
              {formik.touched.enrolledCourse && formik.errors.enrolledCourse ? (
                <p id="error">{formik.errors.enrolledCourse}</p>
              ) : null}
            </div>

              <div className="joinDate" >
                <div className="joinLable">
                  <label htmlFor="joinedDate"  >Joining Date </label>
                </div>
                <DatePicker 
                  id="joinedDate"
                  selected={formik.values.joinedDate}
                  dateFormat="dd / MM / yyyy"
                  placeholderText="DD / MM / YYY"
                  name="joinedDate"
                  disabled ={disableDate}
                  onSelect={date => dateChange(date)}
                  onChange={(date => formik.setFieldValue('joinedDate', date))}
                />
                {formik.touched.joinedDate && formik.errors.joinedDate ? (
                  <p id="error">{formik.errors.joinedDate}</p>
                ) : null}
              </div>

            <div>
              <label htmlFor="endDate">End Date </label>
              <input
                id="endDate"
                name="endDate"
                placeholder="Course End Date"
                value={courseEndDate}
                readOnly
              />
            </div>

            </div>
          </div>
        <button id="addStudent" type="submit">
          Add Student
        </button>
      </form>
    </div>
  );
}
export default AdminAddStudent;
