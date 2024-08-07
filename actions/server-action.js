"use server";

import { connectDb } from "@/config/dbConfig";
import { CartModel } from "@/models/Cart.model";
import { CategoryModel } from "@/models/Category.model";
import { ProductModel } from "@/models/Product.model";
import { UserModel } from "@/models/User.model";
import { DiscountModel } from "@/models/Discount.model";
import Stripe from "stripe";
import { CouponModel } from "@/models/Coupon.model";
import { v4 as uuid } from 'uuid';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function getCategories() {
  try {
    await connectDb();
    const category = await CategoryModel.find({});
    return category;
  } catch (error) {
    console.log(error);
  }
}

export async function checkoutSession({ productList, userId,userEmail,couponCode }) {
  // Generate a unique idempotency key
  const idempotencyKey = uuid();
  try {
    await connectDb();
    const productPromises = productList.map(async (item) => {
      const product = await ProductModel.findById({ _id: item?.id })
        .select("_id product_name description discounts sellingprice product_image")
        .populate("discounts")
        .exec();

      if (product) {
        let checkoutPrice = Number(product.sellingprice.toFixed(0));
        if (product?.discounts) {
          const discount = product.discounts?.percentage;
          checkoutPrice =
            Number((product.sellingprice - product.sellingprice * (discount / 100)).toFixed(0));
        }
        product.sellingprice = Number(product.sellingprice.toFixed(0))
        return {
          ...product.toObject(),
          checkoutPrice,
          quantity: item.quantity,
        };
      }
    });

    const products = await Promise.all(productPromises);
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: products.map((item) => ({
        price_data: {
          currency: "inr",
          product_data: {
            name: item.product_name,
            images:[item?.product_image?.img1?.url]
          },
          unit_amount: item.checkoutPrice * 100,
        },
        quantity: item.quantity,
      })),
      customer_email: userEmail,
      metadata: {
        userId,
        products: JSON.stringify(products.map((item) => ({
          _id: item._id,
          checkoutPrice: item?.checkoutPrice,
          quantity: item?.quantity
        })))
      },
      mode: "payment",
      // allow_promotion_codes: true,
      discounts: couponCode ? [{ coupon: couponCode }] : [],
      shipping_address_collection: {allowed_countries: ['IN']},
      success_url: `${process.env.BACKEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.BACKEND_URL}/error`,
    },{
      idempotencyKey: idempotencyKey // Pass the idempotency key here
    });
    return {url:session.url,status:true}
    return 0
  } catch (error) {
    console.log(error);
    throw error;
  }
}

