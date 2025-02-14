import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'
import { jwtVerify } from "jose";


// async function verifyJWT() {

export const verifyJWT = async () => {

    try {
        
        const cookieStore = await cookies()
        const JWT = cookieStore.get('jwt')?.value

        if(!JWT) {
            return false
        }

        const { payload, protectedHeader } = await jwtVerify(
            JWT as string,
            new TextEncoder().encode(process.env.REFRESH_TOKEN_SECRET as string),
            {
                algorithms: ['HS256'],
            }  
        );
        
        return payload ? true : false

    } catch (error) {
        return false;
    }
    
}