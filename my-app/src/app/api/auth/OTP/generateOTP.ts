import redisClient from '@/config/redis';
import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';
import fs from 'fs/promises';
import path from 'path';

const generateOtp = async (email: string) => {
    try {
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const hashedOtp = await bcrypt.hash(otp, 10);

        await redisClient.set(email, hashedOtp, { EX: 60 * 5 });

        // Read the HTML template
        const htmlTemplate = await fs.readFile(
            path.join(process.cwd(), 'src/app/api/auth/OTP/mail/otp.html'),
            'utf-8'
        );

        // Replace the OTP placeholder
        const emailContent = htmlTemplate.replace('{OTP}', otp);

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Email Verification - Your OTP',
            html: emailContent
        };

        // Send the email
        await transporter.sendMail(mailOptions);

        return true;
        
    } catch (error) {
        console.error('Error generating OTP:', error);
        return false;
    }
}

export default generateOtp;