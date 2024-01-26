import { connectDb } from "@/config/dbConfig";
import { NextResponse } from "next/server";

connectDb() //connecting to database
export async function GET(req,{params}){
    const {id} = params
    console.log(id)
    try {
        return NextResponse.json({id:'hello'},{status:200})
    } catch (error) {
        return NextResponse.json({error},{status:500})
    }
}