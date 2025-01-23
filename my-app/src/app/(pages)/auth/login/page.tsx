"use client";
import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

import './page.css';

// import start from here
import { FaRegCopyright } from "react-icons/fa";
import { FaEye, FaEyeSlash } from "react-icons/fa";


export default function Login() {
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.value);
    }

    const handleLogin = () => {
        console.log('Login button clicked');
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }

  return (
      <div className="LoginComponent">
        <div className="LoginComponent-in">

            <div className="Login-one">
            <div className="login-one-one">
                <h1> <span>{"["}</span> StudentNetwork <span>{"]"}</span> </h1>
            </div>

            <div className="login-one-two">
                <p>Welcome  back! Please login to your account.</p>
            </div>

            <div className="login-one-three">
                <input
                    type="text"
                    placeholder='Enter the email or username'
                    className='LoginComponent-input'
                    onChange={() => handleChange} 
                />
            </div>

            <div className="login-one-four">
                <div className="password-input-container">
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder='Enter the password'
                        className='LoginComponent-input'
                        onChange={() => handleChange}
                    />
                    <button 
                        className="password-toggle-btn"
                        onClick={togglePasswordVisibility}
                        type="button"
                    >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                </div>
            </div>

            <div className="login-one-five">
                <Link href='/auth/forgot-password'>
                    Forgot Password?
                </Link>
            </div>


            <div className="login-one-six">
                <div className="login-one-six-in">
                    <button
                        className='LoginComponent-button'
                        onClick={handleLogin}
                    > 
                    Login 
                    </button>

                    <Link
                        href='/auth/signup'
                        className='LoginComponent-link'
                    > 
                    Sign Up
                    </Link>
                </div>
            </div>
            </div>

            <div className="login-two">
                <div className="login-two-in">
                    <div className="login-two-one">
                        <Link href='/'>about</Link>
                        <Link href='/'>contact</Link>
                        <Link href='/'>faq</Link>
                        <Link href='/'>terms</Link>
                        <Link href='/'>privacy</Link>
                    </div>
                    <div className="login-two-two">
                        <p>a Tadikonda Sai Manikanta production</p>
                        <p>StudentNetwork <FaRegCopyright /> 2025 </p>
                    </div>
                </div>
            </div>

        </div>
      </div>
  );
}
