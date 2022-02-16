import type { NextApiRequest, NextApiResponse } from "next";

export type NextApiRequestX = NextApiRequest & {
  user?: any;
  ssId?: any;
};
