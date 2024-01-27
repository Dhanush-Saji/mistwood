import { connectDb } from "@/config/dbConfig";
import { ProductModel } from "@/models/Product.model";
import { NextResponse } from "next/server";

connectDb() //connecting to database
export async function GET(req,{params}){
    const {id} = params
    const products = await ProductModel.find({_id:id}).select('-__v').populate('category')
    try {
        return NextResponse.json(products,{status:200})
    } catch (error) {
        return NextResponse.json({error},{status:500})
    }
}