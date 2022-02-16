import connectDB from "database";
import User from "database/models/User";
import Handler from "handler";

const handler = new Handler();

handler.get = async function (req, res) {
  const user = await User.findOne({ username: req.query.username })
    .collation({
      locale: "en",
      strength: 2,
    })
    .select("username _id profilePicture");
  if (!user) throw new Error("Sorry, no such user exist");
  return res.status(200).json({ success: true, user });
};

export default handler.init(connectDB);
