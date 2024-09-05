export const quizExplanationInstruction =
  'Based on lesson provided, create me a quiz that will help me learn the most important things, number of questions should be proporiconal to the size of the lesson, but not more than 15 questions. here is the lesson: ';
export const quizFormatInstructions = `Return me an array of objects as JSON formatted as [{...}, {...}, {...}] with no backticks or special formatting. here is an example: [
    {
      question: 'When did the world war 2 start?',
      answers: [
        { answer: '1999', isCorrect: false },
        { answer: '2011', isCorrect: false },
        { answer: '1939', isCorrect: true },
        { answer: '1914', isCorrect: false },
      ],
      correctAnswerExplanation: 'World War II began in Europe on September 1, 1939, when Germany invaded Poland.',
    }
] `;
