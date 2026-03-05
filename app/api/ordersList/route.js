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
        let tempArray = orderData.map((item) => {
            let proAmount = 0;
            item.products.forEach((product) => {
                proAmount += Number(product.checkoutPrice) * Number(product.quantity);
            });
            const modifiedItem = {
                ...item.toObject(),
                couponDiscount: proAmount - item.totalAmount,
            };
            return modifiedItem;
        });
            return NextResponse.json(tempArray,{status:200})
    } catch (error) {
        console.log('error',error)
        return NextResponse.json({data:error,status:false,message:error},{status:500})
    }
}