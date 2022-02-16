import type { NextApiResponse } from "next";
import type { NextApiRequestX } from "types/api";
import Cookies from "cookies";
import { mid_WithUser } from "middleware/user";
import { ut_InitializeCookie } from "utils/cookie";

async function handler(req: NextApiRequestX, res: NextApiResponse) {
  //initialize cookie with keys
  const Cookie = ut_InitializeCookie(req, res, true);

  if (req.method === "GET") {
    try {
      if (!req.ssId) throw new Error("No user session Id found");
      if (req.user) {
        Cookie.set("login", "true", {
          httpOnly: false,
          sameSite: "strict",
          expires: new Date(
            req.user.SSDate.getTime() + 7 * 24 * 60 * 60 * 1000
          ),
        });
        return res.json({ success: true, user: req.user });
      } else throw new Error("No user found");
    } catch (error: any) {
      console.log(error);
      //delete cookie
      Cookie.set("login", "", { expires: new Date(Date.now() - 86400000) });
      return res.status(500).json({
        success: false,
        error: { name: error.name ?? "", message: error.message ?? "" },
      });
    }
  }
}

export default mid_WithUser(handler);
