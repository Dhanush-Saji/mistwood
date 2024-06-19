import mongoose from "mongoose"

const productSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, ref: "products" },
  quantity: { type: Number},
  checkoutPrice: { type: Number},
});


const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    stripeId:{type:String},
    products: [productSchema],
    totalAmount:{type:Number}
  },
  { timestamps: true }
);
export const OrderModel = mongoose.models.order || mongoose.model('order',orderSchema)
