import { connectDb } from "@/config/dbConfig";
import { DiscountModel } from "@/models/Discount.model";
import { ProductModel } from "@/models/Product.model";
import { NextResponse } from "next/server";

connectDb(); //connecting to database
export async function GET(req, { params }) {
  const { id } = params;
  try {
    // const discount = await DiscountModel.find({})
    const products = await ProductModel.find({ _id: id })
      .select("-__v -tax_payable -price -createdAt -updatedAt -vendor -gst -purchase_cost")
      .populate("discounts").populate('category')
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
