import { connectDb } from "@/config/dbConfig";
import { DiscountModel } from "@/models/Discount.model";
import { NextResponse } from "next/server";

connectDb() //connecting to database
export async function GET(req){
    const products = await DiscountModel.find({})
    try {
        return NextResponse.json(products,{status:200})
    } catch (error) {
        return NextResponse.json({error},{status:500})
    }
}