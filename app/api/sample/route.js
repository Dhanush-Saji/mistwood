
import { connectDb } from "@/config/dbConfig";
import { CategoryModel } from "@/models/Category.model";
import { NextResponse } from "next/server";


connectDb()
export async function GET(){
    try {
        const category = await CategoryModel.find({})
    return NextResponse.json(category)
    } catch (error) {
        return NextResponse.json({ error: error})
    }
    
}