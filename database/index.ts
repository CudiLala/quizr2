import mongoose from "mongoose";

export default async function connectDB() {
  if (
    mongoose.connection.readyState === 1 ||
    mongoose.connection.readyState === 2
  )
    return;
  if (process.env.MONGO_URI) {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("mongoose >>", `mongoose mongodb connected`);
  }
}
