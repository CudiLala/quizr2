export async function validateQuizDraft(body: any) {
  const { title, categories, introductoryText, questions } = body;
  if (title) validateTitle(title);
  if (categories) validateCategories(categories);
  if (introductoryText) validateIntroText(introductoryText);
  if (questions) validateQuestions(questions);
}

function validateTitle(title: any) {}
function validateCategories(categories: any) {}
function validateIntroText(introductoryText: any) {}
function validateQuestions(questions: any) {}
