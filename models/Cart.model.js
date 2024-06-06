import mongoose from "mongoose"

const productSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "products" },
  quantity: { type: Number,default: 1 }
});

const cartSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    products: [productSchema],
  },
  { timestamps: true }
);
export const CartModel = mongoose.models.cart || mongoose.model('cart',cartSchema)
