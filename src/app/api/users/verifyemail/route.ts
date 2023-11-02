import { connect } from "@/dbConfig/dbConfig";
import { NextRequest,NextResponse } from "next/server";
import User from "@/models/userModels";

connect();

export async function POST(request:NextRequest){
    try {
        const reqBdoy = await request.json();
        const {token} = reqBdoy;
        console.log(token);

        const user = await User.findOne({
            verifyToken: token,
            // gt means greater than
            verifyTokenExpiry:{$gt: Date.now()}
        })

        if(!user){
            return NextResponse.json({
                error: "User not found",
                status: 400
            })
        }
        console.log(user);

        user.isVerfied = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;
        await user.save();

        return NextResponse.json({
            message: "Email verified successfully",
            status: 200
        })
    } catch (error:any) {
        return NextResponse.json({
            error: error.message,
            status: 400
        })
    }
}