import type { NextApiRequest, NextApiResponse } from "next";
import User from "database/models/User";
import connectDB from "database";
import { SignUpError } from "Errors";
import Session from "database/models/Session";
import bcrypt from "bcrypt";
import { modifyForRegex } from "validators";
import { ut_InitializeCookie } from "utils/cookie";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectDB();
  const Cookie = ut_InitializeCookie(req, res, true);
  if (req.method === "POST") {
    try {
      const body: any = {};
      for (let key in req.body) {
        body[key] = req.body[key].toString().trim();
      }
      if (!body.user || !body.password)
        throw new SignUpError("", "No username/password was provided");

      //findUser
      const user = await User.findOne({
        $or: [
          {
            username: {
              $regex: new RegExp(`^${modifyForRegex(body.user)}$`, "i"),
            },
          },
          { email: body.user },
        ],
      });
      if (!user)
        throw new SignUpError(
          "user",
          "Sorry, this username/email does not exist"
        );

      //check password
      if (!(await bcrypt.compare(body.password, user.password)))
        throw new SignUpError("password", "Your Password is incorrect");

      //reate new session
      const session = await Session.create({ user: user._id });

      //set login and ssId cookies
      const expirationDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
      Cookie.set("ssId", session._id, {
        signed: true,
        sameSite: "strict",
        expires: expirationDate,
      });
      Cookie.set("login", "true", {
        httpOnly: false,
        sameSite: "strict",
        expires: expirationDate,
      });

      //return success and user
      return res.status(200).json({
        success: true,
        user: {
          username: user.username,
          profilePicture: user.profilePicture,
        },
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ success: false, error });
    }
  }
}
