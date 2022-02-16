import mongoose from "mongoose";
import { ut_GenerateFace } from "utils/generics";

const UserDraftSchema = new mongoose.Schema({
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
  password: { type: String },
  profilePicture: { type: String, default: ut_GenerateFace },
  createdAt: {
    type: Date,
    immutable: true,
    select: false,
    default: () => Date.now(),
  },
});

UserDraftSchema.index({ createdAt: 1 }, { expireAfterSeconds: 24 * 60 * 60 });

export default mongoose.models.UserDraft ||
  mongoose.model("UserDraft", UserDraftSchema, "userDrafts");
