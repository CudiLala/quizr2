import type { NextApiRequest, NextApiResponse } from "next";
import Cookies from "cookies";
import connectDB from "database";
import { SignUpError } from "Errors";
import UserDraft from "database/models/User/draft";
import User from "database/models/User";
import { validateSignUpForPost } from "validators";
connectDB();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const key = process.env.COOKIE_KEYS;
  const keys = [`${key ? key : "any key"}`];
  const Cookie = new Cookies(req, res, { keys });

  if (req.method === "POST") {
    try {
      console.clear();
      const userId = Cookie.get("user", { signed: true });
      if (!userId)
        throw new SignUpError("", "No user specified, please recreate account");
      let user = await UserDraft.findById(userId);
      if (!user)
        throw new SignUpError("", "No user specified, please recreate account");
      console.log("user>> ", user);
      console.log("passed 1");
      user = validateSignUpForPost(user);
      console.log("passed 2");
      console.log(user);
      user = await User.create(user);
      console.log("passed 3");
      console.log(user);
      await UserDraft.findByIdAndDelete(userId);
      console.log("passed 4");
      return res.status(200).json({ success: true, user });
    } catch (error: any) {
      console.log(error);
      if (!error.message)
        error = { name: "", message: "An unexpected error occured" };
      return res.status(500).json({ success: false, error });
    }
  }
}
