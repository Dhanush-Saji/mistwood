import { connectDb } from "@/config/dbConfig";
import { UserModel } from "@/models/User.model";
import { NextResponse } from "next/server";
import { DiscountModel } from "@/models/Discount.model";


connectDb()
export async function POST(req){
    try {
        const data = await req.json()
        const { productId, userId, quantity } = data
        const userData = await UserModel.findById({ _id: userId });
        if (userData) {
            if(!userData?.cart){
                userData.cart = []
            }
            const findCartIndex = userData.cart.findIndex(item=> item.productId.toString() == productId)
            if(findCartIndex>=0){
                userData.cart[findCartIndex].quantity += quantity;
            }else{
                userData.cart.push({ productId, quantity:quantity });
            }
            let updatedData= await userData.save();
            await updatedData.populate({
                path: 'cart.productId',
                populate: {
                    path: 'discounts'
                }
            });
            return NextResponse.json({status:true,message:`Cart updated`,data:updatedData},{status:200})
        }else{
            return NextResponse.json({status:false,message:`User not found`},{status:400})
        }
    } catch (error) {
        console.log('error',error)
        return NextResponse.json({data:error,status:false,message:error},{status:500})
    }
}