import connectDB from "database";
import Session from "database/models/Session";
import User from "database/models/User";
import Handler from "handler";

const handler = new Handler();

handler.get = async function (req, res) {
  if (req.query.type === "sessions" || req.query.type === "session") {
    const deleted = await Session.deleteMany({});
    return res.status(200).json(deleted);
  }
  if (req.query.type === "users") {
    const deleted = await User.deleteMany({});
    return res.status(200).json(deleted);
  }
  if (req.query.type === "user") {
    const deleted = await User.deleteOne({ username: req.query.user });
    return res.status(200).json(deleted);
  }
};

export default handler.init(connectDB);
