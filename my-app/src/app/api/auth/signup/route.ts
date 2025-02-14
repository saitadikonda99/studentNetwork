import { pool } from '../../../../config/db'
import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { cookies } from 'next/headers'
import generateOtp from '../OTP/generateOTP'

export const POST = async (req: NextRequest) => {
    try {
        const { fullName, username, email, password } = await req.json();


        const [existingUser]: any = await pool.query(
            `SELECT * FROM users WHERE email = ?`,
            [email]
        );

        console.log(existingUser)


        if (existingUser && existingUser.length > 0 && existingUser[0].isVerified === 1) {
            return NextResponse.json({ message: 'user already exists, Login to continue' }, { status: 400 });
        }

        if (!existingUser || existingUser.length === 0) {
            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 10);

            await pool.query('START TRANSACTION');

            // Insert the new user into the database
            const [result]: any = await pool.query(
                `INSERT INTO users (fullName, username, email, password) VALUES (?, ?, ?, ?)`,
                [fullName, username, email, hashedPassword]
            );
        }

        const otp = await generateOtp(email);

        if (!otp) {
            await pool.query('ROLLBACK');
            return NextResponse.json({ message: 'OTP generation failed' }, { status: 500 });
        }

        await pool.query('COMMIT');

        // Return success response with tokens
        return NextResponse.json(
            { message: 'Verify your email to continue'},
            { status: 200 }
        );

    } catch (error) {
        console.log(error);
        await pool.query('ROLLBACK');
        return NextResponse.json({ message: 'User creation failed' }, { status: 500 });
    }
}