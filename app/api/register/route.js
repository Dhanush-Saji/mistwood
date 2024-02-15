import { connectDb } from "@/config/dbConfig"
import { UserModel } from "@/models/User.model"
import { NextResponse } from "next/server"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

connectDb() //connecting to database
export async function POST(req){
    const secretKey = process.env.TOKEN_KEY;
    const saltRounds = Number(process.env.SALTROUNDS);
    try {
        const data = await req.json()
        const { email, password} = data
        const isUserExist = await UserModel.findOne({ email });
        if (isUserExist) {
        return NextResponse.json({data:'User already exists',status:false},{status:400})
        }
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const newUser = new UserModel({...data,password:hashedPassword});
        const newData = await newUser.save();
        const payload = {
          userId: newData._id,
          email: newData.email,
          username: newData.username,
          user_type: newData.user_type,
          // Add any other user-related information you want in the token
        };
        const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });
        return NextResponse.json({data:token,status:true},{status:200})
    } catch (error) {
        console.log('error',error)
        return NextResponse.json({data:error,status:false},{status:500})
    }
}