export const prompt1Lesson = `Please generate a valid JSON array of objects based on the lesson provided by the user, designed to help them learn key concepts. The quiz should include up to 15 questions, proportional to the size of the lesson, focusing on the most important concepts. For each question, provide multiple-choice answers, and clearly indicate which answer is correct.`;
export const prompt2Lesson = `Ensure that: The array contains objects formatted like this: [
  {
    "question": "Sample question?",
    "answers": [
      { "answer": "Option 1", "isCorrect": false },
      { "answer": "Option 2", "isCorrect": true },
      { "answer": "Option 3", "isCorrect": false },
      { "answer": "Option 4", "isCorrect": false }
    ],
    "correctAnswerExplanation": "Brief explanation for the correct answer."
  }
]
`;
export const prompt3Lesson = `Each object must include a question, an array of 4 possible answers with one marked as correct (isCorrect: true), and a brief explanation of why the correct answer is correct. Do not surround the output in quotes or return it as a string; it must be a valid JSON array of objects. Use the language provided by the user for all content (e.g., questions, answers, and explanations). Return the result as an unformatted JSON array without backticks, special formatting, or quotes around the entire response.`;
export const prompt4Lesson = `Example output format: 
[
  {
    "question": "When did World War II start?",
    "answers": [
      { "answer": "1999", "isCorrect": false },
      { "answer": "2011", "isCorrect": false },
      { "answer": "1939", "isCorrect": true },
      { "answer": "1914", "isCorrect": false }
    ],
    "correctAnswerExplanation": "World War II began in Europe on September 1, 1939, when Germany invaded Poland."
  }
]
`;
