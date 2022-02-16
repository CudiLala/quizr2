import type { NextApiResponse, NextApiHandler } from "next";
import type { NextApiRequestX } from "types/api";
import Session from "database/models/Session";
import User from "database/models/User";
import { ut_InitializeCookie } from "utils/cookie";

export function mid_WithSSID(req: NextApiRequestX, res: NextApiResponse) {
  const Cookie = ut_InitializeCookie(req, res, true); //initialize cookie
  const ssId = Cookie.get("ssId", { signed: true }) ?? null;
  req.ssId = ssId;
}

export async function mid_WithUser(req: NextApiRequestX, res: NextApiResponse) {
  mid_WithSSID(req, res);
  if (!req.ssId) req.user = null;
  else {
    await User.findOne({}); //used to make sure the User model is included in the compiled js file
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
}
