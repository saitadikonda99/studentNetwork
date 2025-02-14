"use client"
import React, { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import useAuthStore from '@/store/authStore'
import Link from 'next/link'
import Image from 'next/image'
import './page.css'
import ImageBoxes from '../../../components/imageBoxes/imageBoxes'

import Logo from '../../../components/logo/logo'

import One from '../../../images/1.png'
import Two from '../../../images/2.png'
import Three from '../../../images/3.png'
import Four from '../../../images/4.png'

const page = () => {

    const router = useRouter()

    const [data, setData] = useState({
        fullName: '',
        email: '',
        username: '',
        password: '',
        confirmPassword: ''
    })

    const setEmailInStore = useAuthStore((state: any) => state.setEmail);
    
    const [emailError, setEmailError] = useState('')
    const [usernameError, setUsernameError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [confirmPasswordError, setConfirmPasswordError] = useState('')
 

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData({ ...data, [e.target.name]: e.target.value })

        if (e.target.name === 'email') {
            const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
            if (!emailRegex.test(e.target.value)) {
                setEmailError('Invalid email address')
            } else {
                setEmailError('')
            }
        }

        if (e.target.name === 'username') {
            const usernameRegex = /^[a-z0-9._]+$/
            if (!usernameRegex.test(e.target.value) || e.target.value.length < 3) {
                setUsernameError('Username can only contain lowercase letters, numbers, dots (.) and underscores (_) and must be at least 3 characters long')
            } else {
                setUsernameError('')
            }
        }

        if (e.target.name === 'password') {
            if (data.password.length < 6) {
                setPasswordError('Password must be at least 6 characters long');
            }
        }

        if (e.target.name === 'confirmPassword') {
            if (data.password !== e.target.value) {
                setConfirmPasswordError('Passwords do not match')
            }
            else {
                setConfirmPasswordError('')
            }
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSubmit(e as unknown as React.MouseEvent<HTMLButtonElement>)
        }
    }   

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()

        // Validate password confirmation
        if (data.password !== data.confirmPassword) {
            alert('Passwords do not match')
            return
        }

        try {
            const response = await axios.post('/api/auth/signup', data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            if (response.status === 200) {
                setEmailInStore(data.email)
                router.push('/auth/otp')
            }

        } catch (error: any) {
            alert(error.response.data.message)
        }
    }
    

    return (
        <div className="SignupComponent">
            <div className="SignupComponent-in">
                <ImageBoxes />
                <div className="signup-two">
                    <div className="signup-two-in">
                        <div className="signup-two-one">
                            <Logo />
                        </div>
                        
                        <div className="signup-two-two">
                            <p>Sign up to get started</p>
                        </div>

                        <div className="signup-two-three">
                            <input 
                                type="text" 
                                placeholder='Full Name'
                                name='fullName'
                                value={data.fullName}
                                onChange={handleChange}
                                onKeyDown={handleKeyDown}
                            />
                        </div>

                        <div className="signup-two-four">
                            <input 
                                type="email" 
                                placeholder='Email'
                                name='email'
                                value={data.email}
                                onChange={handleChange}
                                onKeyDown={handleKeyDown}
                            />
                        </div>

                        <div className="signup-error">
                            {emailError && <p>{emailError}</p>}
                        </div>

                        <div className="signup-two-five">
                            <input 
                                type="text" 
                                placeholder='Username'
                                name='username'
                                value={data.username}
                                onChange={handleChange}
                                onKeyDown={handleKeyDown}
                            />
                        </div>

                        <div className="signup-error">
                            {usernameError && <p>{usernameError}</p>}
                        </div>

                        <div className="signup-two-six">
                            <input 
                                type="password" 
                                placeholder='Password'
                                name='password'
                                value={data.password}
                                onChange={handleChange}
                                onKeyDown={handleKeyDown}
                            />
                        </div>

                        <div className="signup-error">
                            {passwordError && <p>{passwordError}</p>}
                        </div>

                        <div className="signup-two-seven">
                            <input 
                                type="password" 
                                placeholder='Confirm Password'  
                                name='confirmPassword'
                                value={data.confirmPassword}
                                onChange={handleChange}
                                onKeyDown={handleKeyDown}
                            />
                        </div>

                        <div className="signup-error">
                            {confirmPasswordError && <p>{confirmPasswordError}</p>}
                        </div>

                        <div className="signup-two-eight">
                            <button onClick={handleSubmit}>Signup</button>
                        </div>

                        <div className="signup-two-nine">
                            <p>Already have an account? <Link href="/auth/login">Login</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page