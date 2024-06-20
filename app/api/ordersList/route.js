import { connectDb } from "@/config/dbConfig";
import { UserModel } from "@/models/User.model";
import { NextResponse } from "next/server";
import { ProductModel } from "@/models/Product.model";
import { OrderModel } from "@/models/Order.model";


connectDb()
export async function POST(req){
    try {
        const {userId}  = await req.json()
        const orderData = await OrderModel.find({user:userId}).populate('products._id');
        return NextResponse.json(orderData,{status:200})
    } catch (error) {
        console.log('error',error)
        return NextResponse.json({data:error,status:false,message:error},{status:500})
    }
}