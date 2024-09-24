export const prompt1Lesson = `Please generate a valid JSON array of objects based on the lesson provided by the user, designed to help them learn key concepts. The quiz should include up to 15 questions, proportional to the size of the lesson, focusing on the most important concepts. Don't repeat questions. For each question, provide multiple-choice answers, and clearly indicate which answer is correct.`;
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

export const prompt1Quiz = `Create a quiz based on the following user information:`;
export const prompt2QuizPart1 = `Rating: The user's rating is`;
export const prompt2QuizPart2 = `on a scale of 1-10 (with 10 being the highest).`;
export const prompt3QuizPart1 = `Lesson: The quiz should be about the topic`;
export const prompt3QuizPart2 = `from the subject`;
export const prompt4QuizPart1 = `Age: The quiz must be age-appropriate for a user who is`;
export const prompt4QuizPart2 = `years old.`;
export const prompt5QuizPart1 = `Language: All content, including questions, answers, and explanations, must be provided in`
export const prompt6QuizPart1 = `Ensure that the difficulty of the quiz corresponds to the user's selected rating and is tailored to their age. The output should be a JSON array containing objects with the following structure:
Each object should represent a quiz question.
Each question should have four possible answers.
One answer must be marked as correct (isCorrect: true), and the others as incorrect.
Provide a brief explanation for why the correct answer is right.`
export const prompt7QuizPart1 = `Format example: 
[
  {
    "question": "Sample question?",
    "answers": [
      { "answer": "Option 1", "isCorrect": false },
      { "answer": "Option 2", "isCorrect": true },
      { "answer": "Option 3", "isCorrect": false },
      { "answer": "Option 4", "isCorrect": false }
    ],
    "correctAnswerExplanation": "Explanation of why the correct answer is true."
  }
]
`
export const prompt8QuizPart1 = `Important Notes: Output a valid JSON array without special formatting or enclosing the entire response in quotes or backticks. Adjust the complexity of questions based on the user's rating and age to ensure an engaging learning experience.`