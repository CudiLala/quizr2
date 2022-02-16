import mongoose from "mongoose";

const SessionSchema = new mongoose.Schema({
  user: { type: mongoose.SchemaTypes.ObjectId, immutable: true, ref: "User" },
  createdAt: { type: Date, immutable: true, default: () => Date.now() },
});

export default mongoose.models.Session ||
  mongoose.model("Session", SessionSchema, "sessions");
