import type { NextApiResponse } from "next";
import type { NextApiRequestX } from "types/api";
import { mid_WithUser } from "middleware/user";
import connectDB from "database";
import Session from "database/models/Session";
import { ut_InitializeCookie } from "utils/cookie";

async function handler(req: NextApiRequestX, res: NextApiResponse) {
  await connectDB();
  const Cookie = ut_InitializeCookie(req, res, true);
  if (req.method === "DELETE") {
    try {
      if (!req.user) throw new Error("It seems you aren't signed in yet");

      await Session.findByIdAndDelete(req.ssId); //delete session
      Cookie.set("ssId", "", { expires: new Date(Date.now() - 86400000) }); //delete cookie
      Cookie.set("login", "", { expires: new Date(Date.now() - 86400000) }); //delete cookie

      return res.status(200).json({ success: true });
    } catch (error: any) {
      console.log(error);
      return res
        .status(500)
        .json({ success: false, error: { message: error.message ?? "" } });
    }
  }
}

export default mid_WithUser(handler);
