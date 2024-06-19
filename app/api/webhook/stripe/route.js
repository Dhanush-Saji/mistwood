import { connectDb } from "@/config/dbConfig";
import { UserModel } from "@/models/User.model";
import { NextResponse } from "next/server";
import { DiscountModel } from "@/models/Discount.model";
import Stripe from "stripe";
import { OrderModel } from "@/models/Order.model";

connectDb();
export async function POST(req) {
  const body = await req.text();
  console.log('DHANUSH body',body)
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
    const { id, amount_total, metadata,line_items } = event.data.object;
    console.log('DHANUSH line_items',line_items)
    // const order = {
    //   stripeId: id,
    //   user: metadata?.userId,
    //   totalAmount: Number(amount_total)/100,
    //   products: line_items.map((item) => ({
    //     _id: { type: mongoose.Schema.Types.ObjectId, ref: "products" },
    //     quantity: { type: String},
    //     checkoutPrice: { type: String},
    //   }),
    // };
    // try {
    //   const newOrder = new OrderModel(order);
    //   const newData = await newOrder.save();
    //   return NextResponse.json({status:true,message:`Order added`},{status:200})
    // } catch (error) {
    //     console.log('error',error)
    //     return NextResponse.json({data:error,status:false,message:error},{status:500})
    // }
  }
}
