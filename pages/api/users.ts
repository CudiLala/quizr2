import connectDB from "database";
import User from "database/models/User";
import Handler from "handler";
import useSWR from "swr";

const handler = new Handler();

handler.get = async function (req, res) {
  const users = await User.find().select("username _id profilePicture");
  return res.status(200).json({ success: true, users });
};

export default handler.init(connectDB);
