import { pool } from '../../../../config/db'
import { NextRequest, NextResponse } from 'next/server'


export const POST = async (req: NextRequest) => {
    try {

        const { username, password, confirmPassword, email, collegeId } = await req.json();


        if (!username || !password || !confirmPassword || !email || !collegeId) {
            return NextResponse.json({ message: 'Please fill all the fields' }, { status: 400 })
        }

        if (password !== confirmPassword) {
            return NextResponse.json({ message: 'Passwords do not match' }, { status: 400 })
        }


        return NextResponse.json({ message: 'User created successfully' }, { status: 200 })

    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
    }
}