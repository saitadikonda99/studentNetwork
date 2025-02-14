import { pool } from '../../../../config/db'
import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { cookies } from 'next/headers'
import generateOtp from '../OTP/generateOTP'

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
        const { email, password } = await req.json();

        // Get user by email
        const [result]: any = await pool.query(
            `SELECT * FROM users WHERE email = ? OR username = ?`,
            [email, email]
        );


        const isVerified = result[0].isVerified;
        const emailId :string = result[0].email;

        if (isVerified === 0) {
            const otp = await generateOtp(result[0].email);

            if (!otp) {
                return NextResponse.json({ message: 'OTP generation failed'}, { status: 500 });
            }
            
            return NextResponse.json({ message: 'Verify your email to continue', mail: emailId }, { status: 201 });
        }

        if (!result || result.length === 0) {
            return NextResponse.json({ error: 'Invalid username or password' }, { status: 401 })
        }

        const user = result[0];

        // Compare passwords
        const passwordMatch = await bcrypt.compare(password, user.password);
        
        if (!passwordMatch) {
            return NextResponse.json({ error: 'Invalid username or password' }, { status: 401 })
        }

        const accessToken = jwt.sign(
            { username: user.username, role: [user.role], id: user.id },
            process.env.ACCESS_TOKEN_SECRET as string,
            { expiresIn: '10sec', algorithm: 'HS256' }
        )

        const refreshToken = jwt.sign(
            { username: user.username, role: [user.role], id: user.id },
            process.env.REFRESH_TOKEN_SECRET as string,
            { expiresIn: '20sec', algorithm: 'HS256' }
        )

        // Execute the update query
        await pool.execute(
            `UPDATE users
            SET RefreshToken = ?
            WHERE username = ?`,
            [refreshToken, user.username]
        );

        (await cookies()).set('jwt', refreshToken, {
            sameSite: 'lax',
            secure: false,
            httpOnly: false,
        })

        return NextResponse.json({ message: 'Authentication successful' }, { status: 200 })

    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: 'Authentication failed' }, { status: 500 })
    }
}