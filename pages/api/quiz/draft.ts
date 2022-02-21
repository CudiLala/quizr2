import Handler from "handler";
import { mid_WithUser } from "middleware/user";
import { NextApiRequestX } from "types/api";
import { ut_generateQuizTitle } from "utils/api";
import quizDraft from "database/models/Quiz/drafts";
import { validateQuizDraft } from "validators/quiz";
import connectDB from "database";
import { secureAdmin } from "middleware/user";

const handler = new Handler({
  onError: (final, error, req, res) => {
    if (error.name === "CastError")
      error = {
        name: "CastError",
        message:
          "It seems the given id was of the wrong type/format or something else",
      };
    return final(error, req, res);
  },
});

handler.middlewares = [secureAdmin];

handler.get = async function (req, res) {
  const { id, limit: _limit, page: _page, sort = "" } = req.query;
  let page: number = 1,
    limit: number = 0;

  if (id) {
    const draft = await quizDraft.findById(id);
    if (!draft)
      throw new Error("Sorry we couldn't find any draft with such id");
    return res.status(200).json({ success: true, draft });
  }

  //@ts-ignore
  if (parseInt(_page) > 1) page = parseInt(_page);
  //@ts-ignore
  if (parseInt(_limit) > 0) limit = parseInt(_limit);

  const drafts = await quizDraft
    .find({})
    .skip((page - 1) * limit)
    .limit(limit)
    .sort(`${sort} _id`)
    .select("title createdAt")
    .lean();
  return res.status(200).json({ success: true, drafts });
};

handler.post = async function (req, res) {
  let { body } = req;

  if (typeof body !== "object") body = {};
  if (!body.title) body.title = await ut_generateQuizTitle();

  await validateQuizDraft(body);
  const draft = await quizDraft.create(body);

  return res.status(200).json({ success: true, draft });
};

handler.put = async function (req, res) {
  let { body } = req;
  const id = req.query.id;

  if (typeof body !== "object") body = {};
  if (!body.title) body.title = await ut_generateQuizTitle();
  if (!id) throw new Error("No quiz draft id specified");

  await validateQuizDraft(body);
  const draft = await quizDraft.findByIdAndUpdate(id, body, {
    returnDocument: "after",
  });
  if (!draft) throw new Error("Sorry we couldn't find any draft with such id");

  return res.status(200).json({ success: true, draft });
};

handler.delete = async function (req, res) {
  const id = req.query.id;
  if (!id) throw new Error("No quiz draft id specified");

  const returnObj = await quizDraft.findByIdAndDelete(id);
  if (!returnObj) throw new Error("There is no draft with that id");
  return res.status(200).json({ success: true });
};

export default handler.init(connectDB);
