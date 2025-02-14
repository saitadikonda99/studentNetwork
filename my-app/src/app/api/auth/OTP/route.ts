import { pool } from '../../../../config/db'
import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { cookies } from 'next/headers'
import redisClient from '@/config/redis';

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

        const { email, otp } = await req.json();

        console.log(email)

        const hashedOtp = await redisClient.get(email);

        
        if (!hashedOtp) {
            return NextResponse.json({ message: 'Invalid OTP' }, { status: 401 })
        }
        
        const isMatch = await bcrypt.compare(otp, hashedOtp);

        console.log(isMatch)
        
        if (!isMatch) {
            return NextResponse.json({ message: 'Invalid OTP' }, { status: 401 })
        }        


        const [result]: any = await pool.query(
            `SELECT * FROM users WHERE email = ?`,
            [email]
        );

        if (!result || result.length === 0) {
            return NextResponse.json({ error: 'User creation failed' }, { status: 500 });
        }

        const user = result[0];

        // Generate access and refresh tokens
        const accessToken = jwt.sign(
            { username: user.username, role: [user.role], id: user.id },
            process.env.ACCESS_TOKEN_SECRET as string,
            { expiresIn: '10sec', algorithm: 'HS256' }
        );

        const refreshToken = jwt.sign(
            { username: user.username, role: [user.role], id: user.id },
            process.env.REFRESH_TOKEN_SECRET as string,
            { expiresIn: '20sec', algorithm: 'HS256' }
        );

        // Update the user's refresh token in the database
        await pool.execute(
            `UPDATE users
            SET RefreshToken = ?
            WHERE username = ?`,
            [refreshToken, user.username]
        );

        await pool.execute(
            `UPDATE users
            SET isVerified = ?
            WHERE email = ?`,
            [true, email]
        );

        // Set the refresh token in a cookie
        (await cookies()).set('jwt', refreshToken, {
            sameSite: 'lax',
            secure: false,
            httpOnly: false,
        });

        await redisClient.del(email);
        
        return NextResponse.json({ message: 'Authentication successful', accessToken }, { status: 200 })

    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: 'Authentication failed' }, { status: 500 })
    }
}