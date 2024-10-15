import React from "react";
import { useNavigate } from "react-router";
import "./Home.css";

export default function HomePage() {
  let navigate = useNavigate();
  return (
    <div className="Main">
      <div className="image">
        <h1 className="home-h1">Arts and Crafts Academy</h1>
        <img className="homeImg" src="\images/8.jpg" alt="Loading.." />
        <button
          className="HomeLogin"
          onClick={() => {
            navigate("login");
          }}
        >
          Login
        </button>
        <button
          className="HomeSignup"
          onClick={() => {
            navigate("signup");
          }}
        >
          SignUp
        </button>
      </div>
    </div>
  );
}
