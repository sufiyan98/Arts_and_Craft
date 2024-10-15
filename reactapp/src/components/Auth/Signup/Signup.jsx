import React from 'react';
import { useFormik } from 'formik';
import * as Yup from "yup";
import { Link, useNavigate  } from 'react-router-dom';
import '../Auth.css'
import UserService from '../../../service/UserService';
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Signup() {
    let navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            email: '',
            username: '',
            mobileNumber: '',
            password: '',
            passwordConfirmation: '',
            userRole: 'user'
        },
        validationSchema: Yup.object({
          email: Yup.string()
            .email('Invalid email address')
            .required('Email Id is Required'),
          username: Yup.string()
            .max(15, 'Must be 15 characters or less')
            .required('User name is Required'),
          mobileNumber: Yup.string()
            .required('Mobile number is Required') 
            .max(10, 'Mobile number not greater than 10')
            .matches(/[0-9]{10}/, 'Mobile Number contain only 10 digits.'),
          password: Yup.string()
            .required('Password is Required') 
            .min(8, 'Password is too short !')
            .matches(/[a-zA-Z]/, 'Password can only contain alphabet letters.'),
          passwordConfirmation: Yup.string()
            .required('Confirm Password is Required')
            .oneOf([Yup.ref('password'), null], 'Passwords not match !')
        }),
        onSubmit: values => {
            UserService.checkUserMailId(values.email).then(res =>{
                if(res.data) {
                    toast.warn('Email Id already taken');                
                }else {
                    toast.success('Creating Accout...');
                    UserService.createUser(values).then(res =>{
                        toast.success('Registration success...');
                        navigate("/login");
                    });
                }
            }); 
        },
    });
  return (
    <div className="signup">
        <div className="signup-heading">
            <div className="signup-grid">
                <div className="signup-left">
                    <h1 className="welcome">Arts and Crafts Academy</h1>
                    <div className="signupImgDiv">
                        <img className="signup-img" src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp" alt="signup img" />
                    </div>
                </div>
                <div className="signup-right">
                <h1 className="signup-h">SignUp</h1>
                    <form onSubmit={formik.handleSubmit}>
                        <div>
                            <label htmlFor="email">Email Id</label>
                            <input
                            id="email"
                            name="email"
                            type="email"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email} />
                            {    
                                formik.touched.email && formik.errors.email ? (
                                    <div className="error">{formik.errors.email}</div>
                                ) : null
                            }
                        </div>
                        <div>
                            <label htmlFor="username">User Name</label>
                            <input
                            id="username"
                            name="username"
                            type="text"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.username} />
                            {   
                                formik.touched.username && formik.errors.username ? (
                                    <div className="error">{formik.errors.username}</div>
                                ) : null
                            }
                        </div>
                        <div>
                            <label htmlFor="mobileNumber">Mobile Number</label>
                            <input
                            id="mobileNumber"
                            name="mobileNumber"
                            type="text"
                            pattern="\d*"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.mobileNumber} />
                            {   
                                formik.touched.mobileNumber && formik.errors.mobileNumber ? (
                                    <div className="error">{formik.errors.mobileNumber}</div>
                                ) : null
                            }
                        </div>
                        <div>
                            <label htmlFor="password">Password</label>
                            <input
                            id="password"
                            name="password"
                            type="password"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.password} />
                            {
                                formik.touched.password && formik.errors.password ? (
                                    <div className="error">{formik.errors.password}</div>
                                ) : null
                            }
                        </div>
                        <div>
                            <label htmlFor="passwordConfirmation">Confirm Password</label>
                            <input
                            id="confirmPassword"
                            name="passwordConfirmation"
                            type="password"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.passwordConfirmation} />
                            {
                                formik.touched.passwordConfirmation && formik.errors.passwordConfirmation ? (
                                    <div className="error">{formik.errors.passwordConfirmation}</div>
                                ) : null
                            }
                        </div>
                        <div className="signup-text">Already a User? <Link to="/login">Login</Link> </div>
                        <div><button id="submitButton" type="submit">Submit</button></div>
                    </form>
                </div>
            </div>
        </div>
        <ToastContainer />
    </div> 
   );
}
