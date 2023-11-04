import { sendEmail } from '@/helper/mailer';
import { connect } from "@/dbConfig/dbConfig";
import { NextRequest,NextResponse } from "next/server";
import User from "@/models/userModels";

connect();

export async function POST(request:NextRequest) {
    try {
        const reqBody = await request.json();
        console.log(reqBody)
        const {email} = reqBody;
        // console.log(email);        
       
        const user = await User.findOne({ email })

        if(!user){
            // alert("User not found")
            return NextResponse.json({
                error: "User not found",
                status: 400
            })
        }
        const userId = user._id;
        console.log(user)
        
        // Send verification email
        await sendEmail({
            email,
            emailType: 'RESET',
            userId: userId
        })

        return NextResponse.json({
            message: {email},
            status: 200
        })
    } catch (error:any) {
        console.log(error.message)
        return NextResponse.json({
            error: error.message,
            status: 400
        })
    }
}