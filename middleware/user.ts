import type { NextApiResponse, NextApiHandler } from "next";
import type { NextApiRequestX } from "types/api";
import Session from "database/models/Session";
import User from "database/models/User";
import { ut_InitializeCookie } from "utils/cookie";

if (User) console.log(""); //to make sure User is loaded (used in populating user | might be cut off from compile)

export function mid_WithSSID(req: NextApiRequestX, res: NextApiResponse) {
  const Cookie = ut_InitializeCookie(req, res); //initialize cookie
  const ssId = Cookie.get("ssId") ?? null;
  req.ssId = ssId;
}

export async function mid_WithUser(req: NextApiRequestX, res: NextApiResponse) {
  mid_WithSSID(req, res);
  if (!req.ssId) req.user = null;
  else {
    const session: any = await Session.findById(req.ssId).populate(
      "user",
      "username profilePicture _id isAdmin"
    );
    if (session?.user) {
      req.user = {
        id: session.user._id,
        username: session.user.username,
        profilePicture: session.user.profilePicture,
        SSDate: session.createdAt,
      };
      if (session.user.isAdmin) req.user.isAdmin = true;
    } else req.user = null;
  }
}

export async function secureAdmin(req: NextApiRequestX, res: NextApiResponse) {
  await mid_WithUser(req, res);
  if (!req?.user?.isAdmin)
    throw new Error("This user cannot perform this kind of operations");
}
