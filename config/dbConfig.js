import mongoose from "mongoose";

let url = process.env.MONGO_URL
export async function connectDb() {
  try {
    mongoose.connect(url,{
        dbName:"dashboard",
      });
    mongoose.connection.on("connected", () => {
      console.log("MongoDB connected");
    });

    mongoose.connection.on("error", (err) => {
      console.log("MongoDB error" + err);
      process.exit();
    });
  } catch (error) {
    console.log(error);
  }
}