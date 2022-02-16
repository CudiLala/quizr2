import type { NextApiResponse, NextApiHandler } from "next";
import type { NextApiRequestX } from "types/api";
import Session from "database/models/Session";
import connectDB from "database";
import User from "database/models/User";
import { ut_InitializeCookie } from "utils/cookie";

export function mid_WithUser(handler: NextApiHandler) {
  async function withUser(req: NextApiRequestX, res: NextApiResponse) {
    await User.findOne({}); //used to make sure the User model is included in the compiled js file
    if (!req.ssId) req.user = null;
    else {
      const session: any = await Session.findById(req.ssId).populate(
        "user",
        "username profilePicture _id"
      );
      if (session?.user) {
        req.user = {
          id: session.user._id,
          username: session.user.username,
          profilePicture: session.user.profilePicture,
          SSDate: session.createdAt,
        };
      } else req.user = null;
    }
    return handler(req, res);
  }
  return mid_WithSSID(withUser);
}

export function mid_WithSSID(handler: NextApiHandler) {
  return async function (req: NextApiRequestX, res: NextApiResponse) {
    await connectDB();

    //initialize cookies with keys
    const Cookie = ut_InitializeCookie(req, res, true);

    const ssId = Cookie.get("ssId", { signed: true }) ?? null;
    req.ssId = ssId;

    return handler(req, res);
  };
}
