import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  profilePicture: String,
  createdAt: { type: Date, default: new Date(Date.now()) },
});

export default mongoose.models.User ||
  mongoose.model("User", UserSchema, "users");
