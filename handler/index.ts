import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

export default class Handler {
  runError: (error: any, req?: NextApiRequest, res?: NextApiResponse) => void;
  get: NextApiHandler;
  post: NextApiHandler;
  put: NextApiHandler;
  patch: NextApiHandler;
  delete: NextApiHandler;
  middlewares: NextApiHandler[];

  constructor(
    arg: {
      onError: (
        error: any,
        req?: NextApiRequest,
        res?: NextApiResponse
      ) => void;
    } = {
      onError: function (error, req, res) {
        console.log(error);
        return res?.status(500).json({
          success: false,
          error: {
            name: error.name ?? "",
            message: error.message ?? "An unexpected Error Occured",
          },
        });
      },
    }
  ) {
    this.runError = arg.onError;
    this.get = async (req, res) => {};
    this.post = async (req, res) => {};
    this.put = async (req, res) => {};
    this.patch = async (req, res) => {};
    this.delete = async (req, res) => {};
    this.middlewares = [];
  }

  init(func = async () => {}) {
    return async (req: NextApiRequest, res: NextApiResponse) => {
      func();
      for (let middleware of this.middlewares) {
        await middleware(req, res);
      }
      try {
        if (req.method === "GET") {
          await this.get(req, res);
        }
        if (req.method === "POST") {
          await this.post(req, res);
        }
        if (req.method === "PUT") {
          await this.put(req, res);
        }
        if (req.method === "PATCH") {
          await this.patch(req, res);
        }
        if (req.method === "DELETE") {
          await this.delete(req, res);
        }
      } catch (error) {
        return this.runError(error, req, res);
      }
    };
  }
}
