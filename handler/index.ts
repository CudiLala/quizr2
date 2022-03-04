import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

export default class Handler {
  runError: (
    final: (error: any, req?: NextApiRequest, res?: NextApiResponse) => void,
    error: any,
    req?: NextApiRequest,
    res?: NextApiResponse
  ) => void;
  get: NextApiHandler;
  post: NextApiHandler;
  put: NextApiHandler;
  patch: NextApiHandler;
  delete: NextApiHandler;
  middlewares: NextApiHandler[];

  constructor(
    arg: {
      onError: (
        final: (
          error: any,
          req?: NextApiRequest,
          res?: NextApiResponse
        ) => void,
        error: any,
        req?: NextApiRequest,
        res?: NextApiResponse
      ) => void;
    } = {
      onError: function (final, error, req, res) {
        return final(error, req, res);
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
      await func();
      try {
        for (let middleware of this.middlewares) {
          await middleware(req, res);
        }
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
        return this.runError(this.final, error, req, res);
      }
    };
  }

  final(error: any, req?: NextApiRequest, res?: NextApiResponse) {
    console.log(error);
    return res?.status(500).json({
      success: false,
      error: {
        name: error.name ?? "",
        message: error.message ?? "An unexpected error occured",
      },
    });
  }
}
