import { connectDb } from "@/config/dbConfig";
import { CategoryModel } from "@/models/Category.model";
import { ProductModel } from "@/models/Product.model";
import { NextResponse } from "next/server";

connectDb() //connecting to database
export async function GET(req){
    let response = []
    try {
        let count = await ProductModel.countDocuments({isActive:true})
        response.push({name:"All",count})
        const categories = await CategoryModel.find({})
        for(const category of categories){
            let count = await ProductModel.countDocuments({category:category._id,isActive:true})
            response.push({name:category.category_name,count})
        }
        return NextResponse.json(response,{status:200})
    } catch (error) {
        return NextResponse.json({error},{status:500})
    }
}