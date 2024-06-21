import { connectDb } from "@/config/dbConfig"
import { UserModel } from "@/models/User.model"
import { NextResponse } from "next/server"
import crypto from "crypto"
import ResetPassword from "@/components/Email-templates/ResetPassword"
import nodemailer from 'nodemailer'

connectDb() //connecting to database
export async function POST(req){
    try {
        const data = await req.json()
        const { email} = data
        const isUserExist = await UserModel.findOne({ email });
        if (isUserExist) {
            const resetToken = crypto.randomBytes(20).toString('hex')
            const passwordresetToken = crypto.createHash("sha256").update(resetToken).digest('hex')
            const passwordResetExpires = Date.now() + 3600000;
            isUserExist.resetToken = passwordresetToken
            isUserExist.resetTokenExpiry = passwordResetExpires
            const resetUrl = `${process.env.NEXTAUTH_URL}/reset-password/${resetToken}`
            let username = isUserExist.username

            const transport = nodemailer.createTransport({
                service:'gmail',
                auth:{
                    user:process.env.SMTP_EMAIL,
                    pass:process.env.SMTP_PASSWORD
                }
            })
            const testResult = await transport.verify()
            const sendResult = await transport.sendMail({
                from:process.env.SMTP_EMAIL,
                to:email,
                subject:'Reset Passwords',
                html:ResetPassword({username,link:resetUrl})
            })
             await isUserExist.save()
        return NextResponse.json({message:'Reset link sent to email',status:true},{status:200})
        }
        return NextResponse.json({status:false,message:`Email doesn't exist!`},{status:400})
    } catch (error) {
        console.log('error',error)
        return NextResponse.json({status:false,message:error},{status:500})
    }
}