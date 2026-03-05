import { connectDb } from "@/config/dbConfig"
import { NextResponse } from "next/server"
import crypto from "crypto"
import { UserModel } from "@/models/User.model"


connectDb() //connecting to database
export async function POST(req){
    try {
        const {token} = await req.json()
        const hashedToken = crypto.createHash("sha256").update(token).digest('hex')
        const isUserExist = await UserModel.findOne({
            resetToken: hashedToken,
            resetTokenExpiry:{$gt:Date.now()}
        })
        if(isUserExist){
            return NextResponse.json({username:isUserExist?.username,message:'Token valid',status:true},{status:200})
        }else{
            return NextResponse.json({message:'Invalid Token',status:false},{status:400})
        }
    } catch (error) {
        console.log(error)
        return NextResponse.json({status:false,message:error},{status:500})
    }
}