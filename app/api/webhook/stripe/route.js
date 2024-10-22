import { connectDb } from "@/config/dbConfig";
import { UserModel } from "@/models/User.model";
import { NextResponse } from "next/server";
import { DiscountModel } from "@/models/Discount.model";
import Stripe from "stripe";
import { OrderModel } from "@/models/Order.model";
import nodemailer from 'nodemailer'
import OrderDetails from "@/components/Email-templates/OrderDetails";
import { dateToTextMonth, getDateddmmyyy } from "@/services/Formatter";

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
      products: JSON.parse(metadata?.products),
      totalAmount: Number(amount_total)/100,
    };
    try {
      const existingOrder = await OrderModel.findOne({ stripeId: event.data.object.id });
      if(existingOrder){
        return NextResponse.json({status:false,message:`Order already exist`},{status:500})
      }
      const newOrder = new OrderModel(order);
      const newData = await newOrder.save();
      // if(newData){
      //   const userData = await UserModel.findByIdAndUpdate({ _id: metadata?.userId },{cart:[]},{new:true});
      //   const orderData = await OrderModel.findById(newData._id).populate('products._id').exec();
      //   const transport = nodemailer.createTransport({
      //     service:'gmail',
      //     auth:{
      //         user:process.env.SMTP_EMAIL,
      //         pass:process.env.SMTP_PASSWORD
      //     }
      // })
      // const testResult = await transport.verify()
      // const customOrderdate = dateToTextMonth(orderData?.createdAt) || ''
      // let emailTemplate = await OrderDetails({username:userData?.username,orderid:orderData?._id,orderdate:customOrderdate,products:orderData?.products,totalAmount:orderData?.totalAmount})
      // const sendResult = await transport.sendMail({
      //     from:process.env.SMTP_EMAIL,
      //     to:userData?.email,
      //     subject:'Order Successful',
      //     html:emailTemplate
      // })
      // }
      return NextResponse.json({status:true,message:`Order added`},{status:200})
    } catch (error) {
        console.log('error',error)
        return NextResponse.json({data:error,status:false,message:error},{status:500})
    }
  }
}
