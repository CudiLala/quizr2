import quizDraft from "database/models/Quiz/drafts";

export async function ut_generateQuizTitle() {
  const quizes = await quizDraft
    .find({ title: { $regex: /^Untitled_\d+$/i } })
    .select("title -_id")
    .sort({ title: 1 })
    .lean();
  if (quizes.length === 0) return "Untitled_1";

  const theLastNum = Number(quizes.pop().title.match(/\d+$/)[0]);
  return `Untitled_${theLastNum + 1}`;
}
