import { ProductModel } from "@/models/Product.model";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const data = await req.json();
    const {productList, userId } = data;
    const productPromises = productList.map(async (item) => {
      const product = await ProductModel.findById({_id:item?.id})
        .select("_id product_name description discounts sellingprice")
        .populate('discounts')
        .exec();

      if (product) {
        let checkoutPrice = product.sellingprice;
        if (product?.discounts) {
          const discount = product.discounts?.percentage;
          checkoutPrice =
            product.sellingprice - product.sellingprice * (discount / 100);
        }

        return {
          ...product.toObject(),
          checkoutPrice,
          quantity: item.quantity
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
