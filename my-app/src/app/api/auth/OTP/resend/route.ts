import { pool } from '../../../../../config/db'
import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { cookies } from 'next/headers'
import redisClient from '@/config/redis';
import generateOtp from '../generateOTP'

// Define user interface
interface User {
    id: number;
    username: string;
    email: string;
    role: string;
    password: string;
}

export const POST = async (req: NextRequest) => {
    try {

        const { email } = await req.json();
        
        const otp = await generateOtp(email);

        if (!otp) {
            await pool.query('ROLLBACK');
            return NextResponse.json({ message: 'OTP generation failed' }, { status: 500 });
        }

        return NextResponse.json({ message: 'OTP sent to your email' }, { status: 200 });

    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: 'Authentication failed' }, { status: 500 })
    }
}