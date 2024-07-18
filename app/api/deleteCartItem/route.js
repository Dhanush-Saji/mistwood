import { connectDb } from "@/config/dbConfig";
import { UserModel } from "@/models/User.model";
import { NextResponse } from "next/server";
import { DiscountModel } from "@/models/Discount.model";


connectDb()
export async function POST(req){
    try {
        const data = await req.json()
        const { id, userId } = data
        const userData = await UserModel.findById({ _id: userId });
        if (userData) {
            const filteredCart = userData.cart.filter(item=> item._id.toString() != id)
            userData.cart = filteredCart
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