import mongoose from "mongoose";

const OptionSchema = new mongoose.Schema({
  option: String,
  isCorrect: { type: Boolean, default: false },
});

const QuestionSchema = new mongoose.Schema({
  question: {
    type: String,
    trim: true,
  },
  options: { type: [OptionSchema] },
  index: Number,
});

const QuizDraftSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    index: { unique: true, collation: { locale: "en", strength: 2 } },
  },
  categories: [String],
  introductoryText: String,
  questions: [QuestionSchema],
  createdAt: { type: Date, default: () => Date.now(), index: 1 },
});

export default mongoose.models.QuizDraft ||
  mongoose.model("QuizDraft", QuizDraftSchema, "quizDrafts");
