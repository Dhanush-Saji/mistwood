import { connectDb } from "@/config/dbConfig";
import { UserModel } from "@/models/User.model";
import { NextResponse } from "next/server";


connectDb()
export async function POST(req){
    try {
        const data = await req.json()
        const { id, userId, type } = data
        console.log(id, userId, type)
        const userData = await UserModel.findById({ _id: userId });
        if (userData) {
            const findCartIndex = userData.cart.findIndex(item=> item._id.toString() == id)
            console.log(findCartIndex)
            if(findCartIndex>=0){
                type?userData.cart[findCartIndex].quantity++:
                userData.cart[findCartIndex].quantity--
            }
            console.log(userData)
            let updatedData= await userData.save();
            await updatedData.populate('cart.productId');
            return NextResponse.json({status:true,message:`Cart updated`,data:updatedData},{status:200})
        }else{
            return NextResponse.json({status:false,message:`User not found`},{status:400})
        }
    } catch (error) {
        console.log('error',error)
        return NextResponse.json({data:error,status:false,message:error},{status:500})
    }
}