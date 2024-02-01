import { connectDb } from "@/config/dbConfig";
import { CategoryModel } from "@/models/Category.model";
import { ProductModel } from "@/models/Product.model";
import { NextResponse } from "next/server";

connectDb() //connecting to database
export async function GET(req){
    try {
        const query = req.nextUrl.searchParams.get('category')
        const categories = await CategoryModel.find({})
        const reqCategory = categories.find((category)=>category.category_name == query)
        const products = await ProductModel.find((query != null && query != 'All' && query != 'null')?{category:reqCategory?._id,isActive:true}:{isActive:true}).select('-__v').populate('category')
        products?.map((product,index)=>{
            if(product?.price){
              let tax = (product?.price*product?.gst*0.01)-(product?.purchase_cost*product?.gst*0.01)
              product.tax_payable = tax
              product.sellingprice = product?.price * ((product?.gst+100)/100)
          }
           })
        return NextResponse.json(products,{status:200})
    } catch (error) {
        return NextResponse.json({error},{status:500})
    }
}