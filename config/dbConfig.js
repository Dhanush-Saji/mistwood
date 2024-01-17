import mongoose from "mongoose";

let url = 'mongodb+srv://dhanush:dhanush@cluster0.myrr0cr.mongodb.net/?retryWrites=true&w=majority'
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