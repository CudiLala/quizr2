import type { NextApiRequest, NextApiResponse } from "next";
import connectDB from "database";
import { SignUpError } from "Errors";
import UserDraft from "database/models/User/draft";
import User from "database/models/User";
import { validateSignUpForPost } from "validators";
import { ut_InitializeCookie } from "utils/cookie";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectDB();
  const Cookie = ut_InitializeCookie(req, res, true);

  if (req.method === "POST") {
    try {
      const userId = Cookie.get("user", { signed: true });
      if (!userId)
        throw new SignUpError("", "No user specified, please recreate account");
      let user = await UserDraft.findById(userId);
      if (!user)
        throw new SignUpError("", "No user specified, please recreate account");
      user = validateSignUpForPost(user);
      user = await User.create(user);
      await UserDraft.findByIdAndDelete(userId);
      Cookie.set("user", "", {
        sameSite: "lax",
        expires: new Date(Date.now() - 8640000000),
      });
      const { _id, username, profilePicture } = user;
      return res
        .status(200)
        .json({ success: true, user: { _id, username, profilePicture } });
    } catch (error: any) {
      console.log(error);
      if (!error.message)
        error = { name: "", message: "An unexpected error occured" };
      return res.status(500).json({ success: false, error });
    }
  }
}
