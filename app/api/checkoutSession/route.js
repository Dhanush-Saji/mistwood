import { ProductModel } from "@/models/Product.model";
import { UserModel } from "@/models/User.model";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const data = await req.json();
    const {productList, userId } = data;
    const userData = await UserModel.findById({_id: userId});
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
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: products.map((item) => ({
        price_data: {
          currency: 'inr',
          product_data: {
            name: item.product_name,
          },
          unit_amount: item.checkoutPrice * 100,
        },
        quantity: item.quantity,
      })),
      metadata:{
        userId
      },
      mode: 'payment',
      customer_email: userData?.email,
      success_url: `${process.env.BACKEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.BACKEND_URL}/canceled`,
    })
    return NextResponse.redirect(session.url, { status: 302 })
    return NextResponse.json({url:'success_url'}, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
