import type { NextApiHandler, NextApiResponse } from "next";
import type { NextApiRequestX } from "types/api";
import connectDB from "database";
import Session from "database/models/Session";
import User from "database/models/User";
import { ut_InitializeCookie } from "utils/cookie";
import Handler from "handler";

const handler = new Handler();

async function mid_WithSSID(req: NextApiRequestX, res: NextApiResponse) {
  const Cookie = ut_InitializeCookie(req, res, true); //initialize cookie
  const ssId = Cookie.get("ssId", { signed: true }) ?? null;
  req.ssId = ssId;
}
async function mid_WithUser(req: NextApiRequestX, res: NextApiResponse) {
  mid_WithSSID(req, res);
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
}

handler.middlewares = [mid_WithUser];

handler.delete = async function (req: NextApiRequestX, res: NextApiResponse) {
  const Cookie = ut_InitializeCookie(req, res, true);
  if (!req.user) throw new Error("It seems you aren't signed in yet");

  await Session.findByIdAndDelete(req.ssId); //delete session
  Cookie.set("ssId", "", { expires: new Date(Date.now() - 86400000) }); //delete cookie
  Cookie.set("login", "", { expires: new Date(Date.now() - 86400000) }); //delete cookie

  return res.status(200).json({ success: true });
};

export default handler.init(connectDB);

// export default mid_WithUser(handler);
