import { pool } from '../../../../../config/db'
import { NextRequest, NextResponse } from 'next/server'
import { jwtVerify } from "jose";
import bcrypt from 'bcrypt';

export const POST = async (req: NextRequest) => {
    try {
        
        const { password, confirmPassword }  = await req.json();

        console.log(req.url.split('/').pop())

        const token = req.url.split('/').pop();
        

        // check the token is valid

        const { payload } = await jwtVerify(
            token as string,
            new TextEncoder().encode(process.env.ACCESS_TOKEN_SECRET as string),
            {
                algorithms: ['HS256'],
            }  
        );

        if (!payload) {
            return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
        }

        if (password !== confirmPassword) {
            return NextResponse.json({ message: 'Passwords do not match' }, { status: 400 });
        }

        const { email } = payload;
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const [result]: any = await pool.query(
            `UPDATE users SET password = ? WHERE email = ?`,
            [hashedPassword, email]
        );

        if (result.affectedRows === 0) {
            return NextResponse.json({message: 'User not found'}, { status: 404 });
        }

        return NextResponse.json({message: 'Password reset successfully'}, { status: 200 });

    } catch (error: any) {
        console.error('Password reset error:', error);
        return NextResponse.json(
            { message: error.message},
            { status: 500 }
        );
    }
}