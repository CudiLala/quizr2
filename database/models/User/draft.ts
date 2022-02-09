import mongoose from "mongoose";

const UserDraftSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: String,
  confirmPassword: String,
  profilePicture: String,
  createdAt: { type: Date, default: new Date(Date.now()) },
});

export default mongoose.models.UserDraft ||
  mongoose.model("UserDraft", UserDraftSchema, "userDrafts");
