import type { NextApiRequest, NextApiResponse } from "next";
import UserDraft from "database/models/User/draft";
import {
  validateSignUpDraftForPost,
  validateSignUpDraftForUpdate,
} from "validators";
import connectDB from "database";
import Cookies from "cookies";
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
      const userId = Cookie.get("user", { signed: true }) ?? "";
      const body: any = {};
      for (let key in req.body) {
        body[key] = req.body[key].toString().trim();
      }
      await validateSignUpDraftForPost(body, userId);
      const user = await UserDraft.create(body);
      Cookie.set("user", user._id, {
        signed: true,
        sameSite: "lax",
        expires: new Date(Date.now() + 86400000),
      });
      return res
        .status(200)
        .json({ success: true, id: user._id, username: user.username });
    } catch (error: any) {
      console.log(error);
      return res.status(500).json({ success: false, error });
    }
  }
  if (req.method === "PUT") {
    try {
      const body: any = {};
      const userId = Cookie.get("user", { signed: true }) ?? "";
      if (!userId) throw "No user specified";
      for (let key in req.body) {
        body[key] = req.body[key].toString().trim();
      }
      await validateSignUpDraftForUpdate(body, userId);
      const user = await UserDraft.findByIdAndUpdate(userId, body);
      return res
        .status(200)
        .json({ success: true, id: user._id, username: user.username });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ success: false, error });
    }
  }
}
