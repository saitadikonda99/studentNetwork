"use client"
import React from 'react'
import axios from 'axios'

import './page.css'

import Logo from '../../../components/logo/logo'


const page = () => {


    const [data, setData] = React.useState({
        email: '',
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        try {

            const response = await axios.post('/api/auth/forgotPassword', data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            if (response.status === 200) {
                alert(response.data.message)
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
        <div className="ForgotPasswordComponent">
            <div className="ForgotPasswordComponent-in">
                <div className="forgotPassword-one">
                    <Logo />
                </div>
                <div className="forgotPassword-two">
                    <p>Enter your Email address or username and we will send you instructions to reset your password.</p>
                </div>
                <div className="forgotPassword-three">
                    <input 
                        type="text" 
                        placeholder='Enter your email or username'
                        name='email'
                        value={data.email}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                    />
                </div>
                <div className="forgotPassword-four">
                    <button onClick={handleSubmit}>Submit</button>
                </div>
                <div className="forgotPassword-five">
                    <a href="/auth/login">Back to Student Network Login</a>
                </div>
            </div>
        </div>
  )
}

export default page