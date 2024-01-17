import mongoose from "mongoose"

const categorySchema = new mongoose.Schema(
  {
    category_name: {
      type: String,
      required: [true, "Please enter category name"],
    },
    category_image: {
      type: Object,
    },
    discounts: { type: mongoose.Schema.Types.ObjectId, ref: "discounts",default:null},
    isActive: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  { timestamps: true }
);
export const CategoryModel = mongoose.models.category || mongoose.model('category',categorySchema)
