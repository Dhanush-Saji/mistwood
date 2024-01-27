"use server"

import { connectDb } from "@/config/dbConfig";
import { CategoryModel } from "@/models/Category.model";
import { ProductModel } from "@/models/Product.model";

export async function getCategories() {
    try {
        await connectDb(); 
        const category = await CategoryModel.find({})
        return category
    } catch (error) {
        console.log(error) 
    }
  }