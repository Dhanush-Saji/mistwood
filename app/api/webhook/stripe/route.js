import { connectDb } from "@/config/dbConfig";
import { UserModel } from "@/models/User.model";
import { NextResponse } from "next/server";
import { DiscountModel } from "@/models/Discount.model";
import Stripe from "stripe";
import { OrderModel } from "@/models/Order.model";

connectDb();
export async function POST(req) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
  let event;

  try {
    event = Stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (error) {
    console.log("error", error);
    return NextResponse.json(
      { data: error, status: false, message: error },
      { status: 500 }
    );
  }
  const eventType = event.type;

  if (eventType == "checkout.session.completed") {
    const { id, amount_total, metadata } = event.data.object;
    const order = {
      stripeId: id,
      user: metadata?.userId,
      products: metadata?.products,
      totalAmount: Number(amount_total),
    };
    try {
      const newOrder = new OrderModel(order);
      const newData = await newOrder.save();
      return NextResponse.json({status:true,message:`Order added`},{status:200})
    } catch (error) {
        console.log('error',error)
        return NextResponse.json({data:error,status:false,message:error},{status:500})
    }
  }
}
