import type { NextApiRequestX } from "types/api";
import { mid_WithUser } from "middleware/user";
import { ut_InitializeCookie } from "utils/cookie";
import Handler from "handler";
import connectDB from "database";

const handler = new Handler({
  onError: function (error, req, res) {
    console.log(error);
    if (!req || !res) return; //avoid ts errors

    //delete login cookie
    const Cookie = ut_InitializeCookie(req, res);
    Cookie.set("login", "", { expires: new Date(Date.now() - 86400000) });

    return res.status(500).json({
      success: false,
      error: { name: error.name ?? "", message: error.message ?? "" },
    });
  },
});

handler.middlewares = [mid_WithUser];

handler.get = function (req: NextApiRequestX, res) {
  const Cookie = ut_InitializeCookie(req, res);
  if (!req.ssId) throw new Error("No user session Id found");
  if (req.user) {
    Cookie.set("login", "true", {
      httpOnly: false,
      sameSite: "strict",
      expires: new Date(req.user.SSDate.getTime() + 7 * 24 * 60 * 60 * 1000),
    });
    return res.json({ success: true, user: req.user });
  } else throw new Error("No user found");
};

export default handler.init(connectDB);
