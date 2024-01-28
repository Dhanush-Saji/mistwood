import { connectDb } from "@/config/dbConfig";
import { NextResponse } from "next/server";
import { ProductModel } from "@/models/Product.model";

connectDb() //connecting to database
export async function POST(req){
    try {
        const {id} = await req.json() || ''
        const product = await ProductModel.findOne({_id:id}).select('-__v')
        if(product){
            const products = await ProductModel.find({category:product?.category}).select('-__v')
            return NextResponse.json(products,{status:200})
        }
        return NextResponse.json([],{status:200})
    } catch (error) {
        console.log(error)
        return NextResponse.json({error},{status:500})
    }
}