import mongoose from "mongoose"

const discountSchema = new mongoose.Schema(
  {
    discount_name: {
      type: String,
      required: [true, "Please enter discount name"],
    },
    percentage: { type: Number, default: null},
    categories: [{ type: mongoose.Schema.Types.ObjectId, ref: "category" }],
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: "products" }],
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);
export const DiscountModel = mongoose.models.discounts || mongoose.model('discounts',discountSchema)
