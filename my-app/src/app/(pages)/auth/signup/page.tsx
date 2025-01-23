"use client"
import React from "react";

import "./page.css";

export default function Signup() {

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
  };

  const handleLogin = () => {
    console.log("Login button clicked");
  };

  return (
    <div className="SignupComponent">
      <div className="SignupComponent-in">
        <h1>
          {" "}
          <span>{"["}</span> StudentNetwork <span>{"]"}</span>{" "}
        </h1>

        <input
          type="text"
          placeholder="Enter the email"
          className="SignupComponent-input"
          onChange={() => handleChange}
        />

        <input
          type="text"
          placeholder="Enter the username"
          className="SignupComponent-input"
          onChange={() => handleChange}
        />

        <select
            className="SignupComponent-input"
            onChange={() => handleChange}
        >
            <option value="">Select the college</option>
            <option value="KL university">KL university</option>
            <option value="VIT">VIT</option>
            <option value="SRM">SRM</option>
            <option value="Gitam">Gitam</option>
        </select>

        <input
          type="password"
          placeholder="Enter the password"
          className="SignupComponent-input"
          onChange={() => handleChange}
        />

        <input 
            type="password"
            placeholder="Confirm the password"
            className="SignupComponent-input"
            onChange={() => handleChange}
        />



      </div>
    </div>
  );
}
