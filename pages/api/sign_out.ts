import type { NextApiRequestX } from "types/api";
import connectDB from "database";
import Session from "database/models/Session";
import Handler from "handler";
import { mid_WithUser } from "middleware/user";
import { ut_InitializeCookie } from "utils/cookie";

const handler = new Handler();

handler.middlewares = [mid_WithUser];

handler.delete = async function (req: NextApiRequestX, res) {
  const Cookie = ut_InitializeCookie(req, res);
  if (!req.user) throw new Error("It seems you aren't signed in yet");

  await Session.deleteOne({ _id: req.ssId }); //delete session
  Cookie.set("ssId", "", { expires: new Date(Date.now() - 86400000) }); //delete cookie
  Cookie.set("login", "", { expires: new Date(Date.now() - 86400000) }); //delete cookie

  return res.status(200).json({ success: true });
};

export default handler.init(connectDB);

// export default mid_WithUser(handler);
