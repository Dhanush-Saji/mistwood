import mongoose from "mongoose"

const couponSchema = new mongoose.Schema(
  {
    code: { type: String, required: true, unique: true },
    amount_off: { type: Number,default:null },
    percent_off: { type: Number,default:null },
    duration: { type: String, enum: ['once', 'repeating', 'forever'] },
    max_redemptions: { type: Number },
    isActive: { type: Boolean, default: true },
    type:{ type: String},
    des:{ type: String}
  },
  { timestamps: true }
);

export const CouponModel = mongoose.models.coupon || mongoose.model('coupon',couponSchema)