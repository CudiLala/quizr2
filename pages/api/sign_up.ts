import connectDB from "database";
import User from "database/models/User";
import { validateSignUpForPost } from "validators";
import Handler from "handler";

const handler = new Handler({
  onError: function (error, req, res) {
    if (error.code == 11000)
      error = { name: "", message: "username/email is already taken" };
    if (!error.message)
      error = { name: "", message: "An unexpected error occured" };
    return res?.status(500).json({ success: false, error });
  },
});

handler.post = async function (req, res) {
  const body: any = {};
  for (let key in req.body) {
    body[key] = req.body[key].toString().trim();
  }

  await validateSignUpForPost(body);
  const user = await User.create(body);
  const { _id, username, profilePicture } = user;

  return res
    .status(200)
    .json({ success: true, id: _id, username, profilePicture });
};

export default handler.init(connectDB);
