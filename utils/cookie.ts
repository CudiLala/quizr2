import Cookies from "cookies";
import { NextApiRequest, NextApiResponse } from "next";

export function ut_InitializeCookie(
  req: NextApiRequest,
  res: NextApiResponse,
  withKeys?: boolean
) {
  if (!withKeys) return new Cookies(req, res);
  const key = process.env.COOKIE_KEYS;
  const keys = [`${key ? key : "any key"}`];
  return new Cookies(req, res, { keys });
}
