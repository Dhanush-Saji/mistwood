import { connectDb } from "@/config/dbConfig";
import { UserModel } from "@/models/User.model";
import { NextResponse } from "next/server";
import { DiscountModel } from "@/models/Discount.model";
import { ProductModel } from "@/models/Product.model";
import { CouponModel } from "@/models/Coupon.model";


connectDb()
export async function GET() {
    try {
        const coupons = await CouponModel.find({});
        return NextResponse.json({ status: true, message: `Cart updated`, data: coupons }, { status: 200 })
    } catch (error) {
        console.log('error', error)
        return NextResponse.json({ data: error, status: false, message: error }, { status: 500 })
    }
}