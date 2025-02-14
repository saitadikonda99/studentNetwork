"use client"
import React from 'react'
import axios from 'axios'
import { useRouter, useParams } from 'next/navigation'

import './page.css'

const page = () => {

    const params = useParams()
    const token = params.token as string

    const [data, setData] = React.useState({
        password: '',
        confirmPassword: ''
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {

        if (data.password !== data.confirmPassword) {
            alert('Passwords do not match')
            return
        }

        e.preventDefault()
        try {

            const response = await axios.post(`/api/auth/resetPassword/${token}`, data, {
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
            <h1>Forgot Password</h1>

                <input 
                    type="password" 
                    placeholder='Enter you new password'
                    name='password'
                    value={data.password}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                />
                <input 
                    type="password" 
                    placeholder='Enter your new password'
                    name='confirmPassword'
                    value={data.confirmPassword}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                />
                <button onClick={handleSubmit}>Submit</button>
            </div>
        </div>
  )
}

export default page