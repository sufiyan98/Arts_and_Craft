import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import UserService from "../../../service/UserService";
import PersonalInfoImg from "../../../icon/personalInfo.png";
import LocationlInfoImg from "../../../icon/locationImg.png";
import CourselInfoImg from "../../../icon/courseImg.png";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AdminUpdateStudent() {
  let { studentId } = useParams();
  let navigation = useNavigate();
  const [initialValues, setInitialValues] = useState([]);

  const loadDataOnlyOnce = () => {
    UserService.FindByStudentById(studentId).then((res) => {
      console.log(res.data)
      const updateUser = {
        firstName: res.data.firstName,
        lastName: res.data.lastName,
        gender: res.data.gender,
        fatherName: res.data.fatherName,
        motherName: res.data.motherName,
        phoneNumber: res.data.phoneNumber,
        alternativeNumber: res.data.alternativeNumber,
        emailId: res.data.emailId,
        age: res.data.age,
        houseNo: res.data.houseNo,
        streetName: res.data.streetName,
        areaName: res.data.areaName,
        nationality: res.data.nationality,
        state: res.data.state,
        pincode: res.data.pincode,
      };
      console.log(updateUser);
      setInitialValues(updateUser);
    });
  };
  useEffect(() => {
    loadDataOnlyOnce();
  }, []);
  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    validationSchema: Yup.object({
      firstName: Yup.string()
        .min(3, "Must be between 2 to 15 Character")
        .max(15, "Must be between 2 to 15 Character")
        .required("First Name Required"),
      lastName: Yup.string()
        .min(1, "Must be between 1 to 15 Character")
        .max(15, "Must be between 1 to 15 Character")
        .required("Last Name is Required"),
      gender: Yup.string().required("Gender is required"),
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
      emailId: Yup.string()
        .email("Invalid Email Id")
        .required("Email Required"),
      age: Yup.string().max(2, "Enter a valid Age").required("Age Required"),
      houseNo: Yup.string()
        .min(3, "Minimum 3 Character required")
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
        .matches(/[0-9]{6}/, "Pincode contains only number")
        .required("Pincode Required"),
    }),
    onSubmit: (values) => {
      console.log(formik.values);
      UserService.UpdateStudent(studentId, values).then((res) => {
        toast.success("Updated successfully");
        navigation(-1);
      });
    },
  });

  return (
    <div className="addDetails">
      <form onSubmit={formik.handleSubmit}>
        <div className="personalInfo">
          <div className="personalInfo-left">
            <h1 className="title">Personal Information</h1>
            <img className="personalInfoImg" src={PersonalInfoImg} alt="" />
          </div>
          <div className="personalDetails">
            <div>
              <label htmlFor="firstName">First Name </label>
              <input
                id="firstName"
                type="text"
                name="firstName"
                placeholder="Enter your first name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.firstName || ""}
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
                value={formik.values.lastName || ""}
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
                value={formik.values.gender || ""}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
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
                value={formik.values.fatherName || ""}
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
                value={formik.values.motherName || ""}
              />
              {formik.touched.motherName && formik.errors.motherName ? (
                <p id="error">{formik.errors.motherName}</p>
              ) : null}
            </div>

            <div>
              <label htmlFor="phoneNumber">Phone no </label>
              <input
                id="phoneNumber"
                type="text"
                pattern="\d*"
                name="phoneNumber"
                placeholder="Enter phone number"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.phoneNumber || ""}
              />
              {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
                <p id="error">{formik.errors.phoneNumber}</p>
              ) : null}
            </div>

            <div>
              <label htmlFor="alternativeNumber">Alternate Phone No </label>
              <input
                id="alternativeNumber"
                type="text"
                pattern="\d*"
                name="alternativeNumber"
                placeholder="Enter alternate number"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.alternativeNumber || ""}
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
                value={formik.values.emailId || ""}
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
                value={formik.values.age || ""}
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
          <div className="addressDetails">
            <div>
              <label htmlFor="houseNo">House no </label>
              <input
                id="houseNo"
                type="text"
                name="houseNo"
                placeholder="Enter house no"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.houseNo || ""}
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
                value={formik.values.streetName || ""}
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
                value={formik.values.areaName || ""}
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
                value={formik.values.nationality || ""}
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
                value={formik.values.state || ""}
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
                value={formik.values.pincode || ""}
              />
              {formik.touched.pincode && formik.errors.pincode ? (
                <p id="error">{formik.errors.pincode}</p>
              ) : null}
            </div>
          </div>
        </div>
        
        <button id="updateStudent" type="submit">
          Update Student
        </button>
      </form>
    </div>
  );
}
