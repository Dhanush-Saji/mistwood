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
export async function addCartProduct(payload) {
  try {
    const { productId, userId, qnty } = payload;
    await connectDb();
    const userData = await UserModel.findById({ _id: userId });
    if (userData) {
      console.log('userData',userData)
      if (!userData?.cart) {
        userData.cart = [];
      }
      const existingCartItemIndex = userData.cart.findIndex(item => item.productId.toString() == productId);
  console.log('existingCartItemIndex',existingCartItemIndex)
      if (existingCartItemIndex >= 0) {
        userData.cart[existingCartItemIndex].quantity += qnty;
      } else {
        userData.cart.push({ productId, quantity:qnty });
      }
      let res= await userData.save();
      console.log(res)
      return true
    }else{
      return false
    }
  } catch (error) {
    console.log(error);
  }
}
