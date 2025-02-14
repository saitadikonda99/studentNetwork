"use client"
import React, { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import './page.css'
import Link from 'next/link'
import useAuthStore from '@/store/authStore'
 
import Logo from '@/app/components/logo/logo'

const OTP = () => {
    const router = useRouter()
    const [otp, setOtp] = useState('')
    const [otpError, setOtpError] = useState('')

    const email = useAuthStore((state: any) => state.email)

    const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        if (value.length <= 4 && /^\d*$/.test(value)) {
            setOtp(value)
        }
    }

    const handleVerifyOtp = async () => {
        try {
            const response = await axios.post('/api/auth/OTP', {
                email,
                otp
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.status === 200) {
                router.push('/');
            }
        } catch (error: any) {
            alert(error.response.data.message)
        }
    }

    const handleResendOtp = async () => {
        try {
            const response = await axios.post('/api/auth/OTP/resend', {
                email
            });

            if (response.status === 200) {
                alert('OTP sent successfully');
            }
        } catch (error) {
            console.error(error);
            alert('Failed to resend OTP');
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleVerifyOtp();
        }
    }


    return (
        <div className="OtpComponent">
            <div className="OtpComponent-in">

                <div className="otp-one">
                    <Logo />
                </div>

                <div className="otp-two">
                    <h1>Enter the four digit OTP</h1>
                    <p>We sent a Code to {email}</p>
                </div>

                <div className="otp-three">
                    <input 
                        type="text" 
                        placeholder="Enter 4-digit OTP"
                        value={otp}
                        onChange={handleOtpChange}
                        onKeyDown={handleKeyDown}
                        maxLength={4}
                    />
                </div>

                <div className="otp-four">
                    <button onClick={handleVerifyOtp}>Verify OTP</button>
                </div>

                <div className="otp-five">
                    <Link href="/auth/login">
                        Back to Login
                    </Link>
                    <p onClick={handleResendOtp}>Resend OTP</p>
                </div>

            </div>
        </div>
    )
}

export default OTP