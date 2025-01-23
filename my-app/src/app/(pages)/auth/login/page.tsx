"use client";
import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

import './page.css';

// import start from here
import { FaRegCopyright } from "react-icons/fa";


export default function Login() {


    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.value);
    }

    const handleLogin = () => {
        console.log('Login button clicked');
    }



  return (
      <div className="LoginComponent">
        <div className="LoginComponent-in">

            <div className="login-one">
                <h1> <span>{"["}</span> StudentNetwork <span>{"]"}</span> </h1>
            </div>

            <div className="login-two">
                <p>Welcome  back! Please login to your account.</p>
            </div>

            <div className="login-three">
                <input
                    type="text"
                    placeholder='Enter the email or username'
                    className='LoginComponent-input'
                    onChange={() => handleChange} 
                />
            </div>

            <div className="login-four">
                <input
                    type="password"
                    placeholder='Enter the password'
                    className='LoginComponent-input'
                    onChange={() => handleChange}
                />
            </div>

            <div className="login-five">
                <Link href='/auth/forgot-password'>
                    Forgot Password?
                </Link>
            </div>


            <div className="login-six">
                <div className="login-six-in">
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

            <div className="login-seven">
                <div className="login-seven-in">
                    <div className="login-seven-one">
                        <Link href='/'>about</Link>
                        <Link href='/'>contact</Link>
                        <Link href='/'>faq</Link>
                        <Link href='/'>terms</Link>
                        <Link href='/'>privacy</Link>
                    </div>
                    <div className="login-seven-two">
                        <p>a Tadikonda Sai Manikanta production</p>
                        <p>StudentNetwork <FaRegCopyright /> 2025 </p>
                    </div>
                </div>
            </div>

        </div>
      </div>
  );
}
