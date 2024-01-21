import mongoose from "mongoose"

const productSchema = mongoose.Schema(
  {
    product_name: {
      type: String,
      required: [true, "Please enter product name"],
    },
    description: {
      type: String,
    },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "category" },
    purchase_cost: {
      type: Number,
    },
    gst: {
      type: Number,
    },
    vendor: {
      type: mongoose.Schema.Types.ObjectId,ref: "users"},
    product_image: {
      type: Object,
    },
    sellingprice: {
      type: Number,
    },
    price: {
      type: Number,
    },
    user_price: {
      type: Number,
    },
    discounts: { type: mongoose.Schema.Types.ObjectId, ref: "discounts",default:null},
    tax_payable: {
      type: Number,
    },
    isActive:{type:Boolean,default:false}
  },
  { timestamps: true }
);
export const ProductModel = mongoose.models.products || mongoose.model('products',productSchema)
