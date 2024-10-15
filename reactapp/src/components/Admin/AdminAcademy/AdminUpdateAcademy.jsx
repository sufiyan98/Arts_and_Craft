import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "../App.css";
import UserService from "../../../service/UserService";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AdminUpdateAcademy() {
  let { academyId } = useParams();
  let navigation = useNavigate();
  const [initialValues, setInitialValues] = useState([]);

  const loadDataOnlyOnce = () => {
    UserService.viewAcademyById(academyId).then((res) => {
      console.log(res.data);
      const updateAcademy = {
        academyName: res.data.academyName,
        academyMobileNo: res.data.academyMobileNo,
        academyImageUrl: res.data.academyImageUrl,
        academyEmail: res.data.academyEmail,
        academyLocation: res.data.academyLocation,
        academyDescription: res.data.academyDescription,
      };
      console.log(updateAcademy);
      setInitialValues(updateAcademy);
    });
  };
  useEffect(() => {
    loadDataOnlyOnce();
  }, []);

  const cancel = () => {
    navigation("/admin/adminAcademy");
  }

  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    validationSchema: Yup.object({
      academyName: Yup.string()
        .min(3, "Enter a Valid Name")
        .max(20, "Enter a Valid Name")
        .required("Required"),
      academyMobileNo: Yup.string()
        .min(10, "Enter a valid number")
        .max(10, "Enter a valid number")
        .required("Required"),
      academyImageUrl: Yup.string().required("Please enter the Url"),
      academyEmail: Yup.string()
        .email("Enter a valid emailId")
        .required("Enter a valid emailId"),
      academyLocation: Yup.string()
        .min(3, "Enter a valid Location")
        .max(15, "Enter a valid Location")
        .required("Required"),
      academyDescription: Yup.string()
        .min(5, "Enter a valid Description")
        .max(200, "Enter a valid Description")
        .required("Required"),
    }),
    onSubmit: (values) => {
      console.log(formik.values);
      UserService.updateAcademy(academyId, values).then((res) => {
        toast.success("Academy Updated Successfully");
        navigation(-1);
      });
    },
  });
  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <h2 className="headingAddCourse">Update Academy</h2>
        <div className="MainDiv">
          <div>
            <label htmlFor="academyName">Academy Name </label>
            <input
              id="editAcademyName"
              type="text"
              name="academyName"
              placeholder="Enter the Academy Name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.academyName}
            />
            {formik.touched.academyName && formik.errors.academyName ? (
              <p id="error">{formik.errors.academyName}</p>
            ) : null}
          </div>
          <div>
            <label htmlFor="academyMobileNo">Mobile Number </label>
            <input
              id="editAcademyMobileNo"
              type="text"
              name="academyMobileNo"
              placeholder="Enter the Mobile No."
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.academyMobileNo}
            />
            {formik.touched.academyMobileNo && formik.errors.academyMobileNo ? (
              <p id="error">{formik.errors.academyMobileNo}</p>
            ) : null}
          </div>
          <div>
            <label htmlFor="academyEmail">Email Id </label>
            <input
              id="editAcademyEmail"
              type="text"
              name="academyEmail"
              placeholder="Enter the email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.academyEmail}
            />
            {formik.touched.academyEmail && formik.errors.academyEmail ? (
              <p id="error">{formik.errors.academyEmail}</p>
            ) : null}
          </div>
          <div>
            <label htmlFor="academyImageUrl">Image URL </label>
            <select
              id="editAcademyImageUrl"
              type="text"
              name="academyImageUrl"
              placeholder="Enter the Image URL"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.academyImageUrl}
            >
              <option value="" label="Select Image" />
              <option value="\images\1.jpg" label="Image 1" />
              <option value="\images\2.jpg" label="Image 2" />
              <option value="\images\3.jpg" label="Image 3" />
              <option value="\images\4.jpg" label="Image 4" />
              <option value="\images\5.jpg" label="Image 5" />
              <option value="\images\6.jpg" label="Image 6" />
              <option value="\images\7.jpg" label="Image 7" />
              <option value="\images\8.jpg" label="Image 8" />
              <option value="\images\9.jpg" label="Image 9" />
              <option value="\images\10.jpg" label="Image 10" /> 
            </select>
            {formik.touched.academyImageUrl && formik.errors.academyImageUrl ? (
              <p id="error">{formik.errors.academyImageUrl}</p>
            ) : null}
          </div>
          <div>
            <label htmlFor="academyLocation"> Location </label>
            <input
              id="editAcademyLocation"
              type="text"
              name="academyLocation"
              placeholder="Enter the Location"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.academyLocation}
            />
            {formik.touched.academyLocation && formik.errors.academyLocation ? (
              <p id="error">{formik.errors.academyLocation}</p>
            ) : null}
          </div>
          <div>
            <label htmlFor="academyDescription">Description </label>
            <input
              id="editAcademyDescrption"
              type="text"
              name="academyDescription"
              placeholder="Enter the Course Name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.academyDescription}
            />
            {formik.touched.academyDescription &&
            formik.errors.academyDescription ? (
              <p id="error">{formik.errors.academyDescription}</p>
            ) : null}
          </div>
          <div><button id="cancel" onClick={() => cancel()}>
            Cancel
          </button></div>
          <button id="updateAcademy" type="submit">
            Update Academy
          </button>
        </div>
      </form>
    </div>
  );
}
