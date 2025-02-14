"use client"
import React, { useState } from 'react'
import './page.css'
import Link from 'next/link'
import Image from 'next/image'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import useAuthStore from '@/store/authStore'
import ImageBoxes from '../../../components/imageBoxes/imageBoxes'

// import './page.css'

import One from '../../../images/1.png'
import Two from '../../../images/2.png'
import Three from '../../../images/3.png'
import Four from '../../../images/4.png'

import Logo from '@/app/components/logo/logo'

const page = () => {
    const router = useRouter()
    const setEmailInStore = useAuthStore((state: any) => state.setEmail)

    const [data, setData] = useState({
        email: '',
        password: ''
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        try {
            const response = await axios.post('/api/auth/login', data)
            
            if (response.status === 201) {
                console.log(response)
                setEmailInStore(response.data.mail)
                router.push('/auth/otp')
            } else if (response.status === 200) {
                router.push('/')
            }
        } catch (error: any) {
            alert(error.response.data.message)
        }
    }   

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleSubmit(e as unknown as React.MouseEvent<HTMLButtonElement>);
        }
    }
    
    return (
        <div className="LoginComponent">    
            <div className="LoginComponent-in">
                <ImageBoxes />
                <div className="login-two">
                    <div className="login-two-in">
                        <div className="login-two-one">
                            <Logo />
                        </div>
                        <div className="login-two-two">
                            <input 
                                type="text" 
                                placeholder='Enter your email or username'
                                name='email'
                                value={data.email}
                                onChange={handleChange}
                                onKeyDown={handleKeyDown}
                            />
                        </div>
                        <div className="login-two-three">
                            <input 
                                type="password" 
                                placeholder='Enter your password'
                                name='password'
                                value={data.password}
                                onChange={handleChange}
                                onKeyDown={handleKeyDown}
                            />
                        </div>
                        <div className="login-two-four">
                            <Link href='/auth/forgotPassword'>Forgot Password?</Link>
                        </div>
                        <div className="login-two-five">
                            <button onClick={handleSubmit}>Login</button>
                        </div>
                        <div className="login-two-six">
                            <p>Don't have an account? <Link href="/auth/signup">Sign up</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page