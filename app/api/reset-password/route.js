import { connectDb } from "@/config/dbConfig"
import { UserModel } from "@/models/User.model"
import { NextResponse } from "next/server"
import bcrypt from "bcrypt"
import crypto from "crypto"

connectDb() //connecting to database
export async function POST(req){
    const secretKey = process.env.TOKEN_KEY;
    const saltRounds = Number(process.env.SALTROUNDS);
    try {
        const data = await req.json()
        const { token, password} = data
        const hashedToken = crypto.createHash("sha256").update(token).digest('hex')
        const isUserExist = await UserModel.findOne({
            resetToken: hashedToken
        })
        if (isUserExist) {
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            const updatedUser = await UserModel.findByIdAndUpdate({ _id: isUserExist?._id },{password:hashedPassword,resetToken:null,resetTokenExpiry:null}, {
                new: true,
            });
            return NextResponse.json({status:true,message:`Password updated`},{status:200})
        }
        return NextResponse.json({message:'User not found',status:false},{status:400})
    } catch (error) {
        console.log('error',error)
        return NextResponse.json({data:error,status:false,message:error},{status:500})
    }
}