import mongoose from "mongoose"

const userSchema = mongoose.Schema({
  username:{
      type:String
  },
  password:{
      type:String,
  },
  user_type:{
      type:String,
      enum: ["user", "vendor", "admin"],
      default: "user"
  },
  orders:[{type:mongoose.Schema.Types.ObjectId,ref:'orders'}],
  events:[{type:mongoose.Schema.Types.ObjectId,ref:'events'}],
  email:{
      type:String,
      unique:true,
      required:[true,"Please enter email"]
  },
  delivery_address:[{
      type:Object
  }],
  mobile_no:{
      type:String
  },
  user_image:{
      type:String
  },
  resetToken:{
      type:String
  },
  resetTokenExpiry:{
      type:Date
  },

},{timestamps:true})
export const UserModel = mongoose?.models?.users || mongoose.model('users',userSchema)
