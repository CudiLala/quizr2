import type { NextApiHandler, NextApiResponse } from "next";
import type { NextApiRequestX } from "types/api";
import connectDB from "database";
import Session from "database/models/Session";
import { ut_InitializeCookie } from "utils/cookie";
import Handler from "handler";
import { mid_WithUser } from "middleware/user";

const handler = new Handler();

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
