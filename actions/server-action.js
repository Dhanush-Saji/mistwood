"use server";

import { connectDb } from "@/config/dbConfig";
import { CartModel } from "@/models/Cart.model";
import { CategoryModel } from "@/models/Category.model";
import { ProductModel } from "@/models/Product.model";
import { UserModel } from "@/models/User.model";

export async function getCategories() {
  try {
    await connectDb();
    const category = await CategoryModel.find({});
    return category;
  } catch (error) {
    console.log(error);
  }
}
