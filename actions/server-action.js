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
  export async function getCategoryCount() {
    let response = []
    try {
        await connectDb(); 
        let count = await ProductModel.countDocuments({isActive:true})
        response.push({name:"All",count})
        const categories = await CategoryModel.find({})
        for(const category of categories){
            let count = await ProductModel.countDocuments({category:category._id,isActive:true})
            response.push({name:category.category_name,count})
        }
        return response
    } catch (error) {
        console.log(error)
    }
}