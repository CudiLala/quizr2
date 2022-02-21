import mongoose from "mongoose";
import { ut_GenerateFace } from "utils/generics";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    index: {
      unique: true,
      collation: { locale: "en", strength: 2 },
    },
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    index: {
      unique: true,
      collation: { locale: "en", strength: 2 },
    },
  },
  password: { type: String, required: true },
  profilePicture: { type: String, default: ut_GenerateFace },
  isAdmin: Boolean,
  createdAt: { type: Date, immutable: true, default: () => Date.now() },
});

export default mongoose.models.User ||
  mongoose.model("User", UserSchema, "users");
