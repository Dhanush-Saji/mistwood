import { ProductModel } from "@/models/Product.model";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const data = await req.json();
    const {productList, userId } = data;
    const productPromises = productList.map(async (item) => {
      const product = await ProductModel.findById({_id:item})
        .select("sellingprice discounts")
        .exec();

      if (product) {
        let checkoutPrice = product.sellingprice;
        if (product.discounts) {
          const discount = product.discounts;
          checkoutPrice =
            product.sellingprice - product.sellingprice * (discount / 100);
        }

        return {
          ...product.toObject(), // Convert Mongoose document to plain object
          checkoutPrice,
        };
      }
    });

    const products = await Promise.all(productPromises);
    console.log(products,userId);
    // You can now use the `products` array which contains the results
    
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
