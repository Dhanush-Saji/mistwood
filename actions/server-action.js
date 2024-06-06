"use server";

import { connectDb } from "@/config/dbConfig";
import { CartModel } from "@/models/Cart.model";
import { CategoryModel } from "@/models/Category.model";
import { ProductModel } from "@/models/Product.model";

export async function getCategories() {
  try {
    await connectDb();
    const category = await CategoryModel.find({});
    return category;
  } catch (error) {
    console.log(error);
  }
}
export async function addCartProduct(payload) {
  try {
    const { productId, userId, qnty } = payload;
    await connectDb();
    const existingCart = await CartModel.findOne({ user: userId });
    if (existingCart) {
      return true;
    } else {
      const newCart = new CartModel({ user:userId,products:[{productId,quantity:qnty}] })
      const data = await newCart.save();
      return true
    }
  } catch (error) {
    console.log(error);
  }
}
