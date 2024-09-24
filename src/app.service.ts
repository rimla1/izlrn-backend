import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { AuthService } from './auth/auth.service';
import { quizDto } from './dtos/quizDto.dto';
import {
  prompt1Lesson,
  prompt1Quiz,
  prompt2Lesson,
  prompt2QuizPart1,
  prompt2QuizPart2,
  prompt3Lesson,
  prompt4Lesson,
} from './utils/prompts';

@Injectable()
export class AppService {
  private openai: OpenAI;

  constructor(private readonly authService: AuthService) {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_KEY,
    });
  }

  async quiz(quizInformation: quizDto, email: string): Promise<any> {
    try {
      const user = await this.authService.findUser(email);
      const canMakeQuiz = await this.authService.checkQuizAttempts(user);
      if (!canMakeQuiz) return "You need at least 1 number of attempts to create a quiz.";
      
      const { rating, lesson, subject, age, language } = quizInformation;
  
      const completion = await this.openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'You are a helpful assistant.' },
          {
            role: 'user',
            content: `Create a quiz based on the following user information:
            Rating: ${rating} (1-10 scale),
            Lesson: ${lesson}, Subject: ${subject},
            Age: ${age}, Language: ${language}.
            
            The quiz should be in valid JSON format.
            
            Requirements:
            1. Provide a JSON array with objects for each quiz question.
            2. Each question should have four possible answers, one marked as correct.
            3. Include an explanation for the correct answer.
            4. The output should be valid JSON without any additional text or formatting.
  
            Example format:
            [
              {
                "question": "What is the capital of France?",
                "answers": [
                  { "answer": "Paris", "isCorrect": true },
                  { "answer": "Berlin", "isCorrect": false },
                  { "answer": "Madrid", "isCorrect": false },
                  { "answer": "Rome", "isCorrect": false }
                ],
                "correctAnswerExplanation": "Paris is the capital of France."
              }
            ]
  
            Provide only the JSON array.`
          }
        ],
      });
  
      console.log("Do ovde radi v2", completion.choices[0].message.content);
      
      // Ensure valid JSON is returned
      let questions;
      try {
        questions = JSON.parse(completion.choices[0].message.content);
      } catch (err) {
        console.error("Failed to parse JSON:", err);
        return "The AI response was not a valid JSON array.";
      }
  
      // Check if it’s a valid array
      if (!Array.isArray(questions)) {
        return "Something went wrong while creating your quiz, no attempts were deducted.";
      }
  
      const updatedAttempts = user.quizAttempts - 1;
      await this.authService.updateUserQuizAttempts(user, updatedAttempts);
  
      return questions;
    } catch (error) {
      console.log("Sta je error!?", error);
      throw new HttpException('Failed to fetch completion', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async lessonQuiz(lesson: string, language: string, email: string): Promise<any> {
    try {
      const user = await this.authService.findUser(email)
      const canMakeQuiz = await this.authService.checkLessonToQuizAttempts(user)
      if(!canMakeQuiz) return "You need at least 1 number of attempts to create quiz."
      const completion = await this.openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'You are a helpful assistant.' },
          {
            role: 'user',
            content: `${prompt1Lesson} ${prompt2Lesson} ${prompt3Lesson} ${prompt4Lesson} . This is user's lesson: ${lesson}. Use ${language} language.`,
          },
        ],
      });
      const questions = JSON.parse(completion.choices[0].message.content)
      if(!(Array.isArray(questions))){
        return "Something went wrong upon creating your quiz, don't worry we won't take your attempts"
      }
      const updatedAttempts = user.lessonToQuizAttempts - 1
      await this.authService.updateUserLessonToQuizAttempts(user, updatedAttempts)
      return questions;
    } catch (error) {
      throw new HttpException(
        'Failed to fetch completion',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }


}
