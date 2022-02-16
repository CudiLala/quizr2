import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  profilePicture: String,
  createdAt: { type: Date, default: () => Date.now() },
});

export default mongoose.models.User ||
  mongoose.model("User", UserSchema, "users");
