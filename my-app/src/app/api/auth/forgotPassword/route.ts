import { pool } from '../../../../config/db'
import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer'
import fs from 'fs/promises'
import path from 'path'

export const POST = async (req: NextRequest) => {
    try {
        
        const { email }  = await req.json();


        const [result]: any = await pool.query(
            `SELECT * FROM users WHERE email = ? OR username = ?`,
            [email, email]
        );


        if (!result || result.length === 0) {
            return NextResponse.json({ message: 'Invalid username or password' }, { status: 401 })
        }

        const userEmail = result[0].email;


        const token = jwt.sign(
            { email: userEmail },
            process.env.ACCESS_TOKEN_SECRET as string,
            { expiresIn: '10m' }
        )

        const url = `http://localhost:3000/auth/resetPassword/${token}`;
        
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        // Read the HTML template
        const templatePath = path.join(process.cwd(), 'src', 'app', 'api', 'auth', 'forgotPassword', 'reset.html');
        let htmlTemplate = await fs.readFile(templatePath, 'utf-8');
        
        // Replace the placeholder with the actual reset link
        htmlTemplate = htmlTemplate.replace('{{resetLink}}', url);

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: userEmail,
            subject: 'Password Reset',
            html: htmlTemplate
        }

        // Send the email
        await transporter.sendMail(mailOptions);

        return NextResponse.json({ message: 'Password reset email sent successfully' }, { status: 200 });

    } catch (error: any) {
        console.error('Password reset error:', error);
        return NextResponse.json(
            { message: error.message},
            { status: 500 }
        );
    }
}