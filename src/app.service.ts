import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import {
  quizExplanationInstruction,
  quizFormatInstructions,
} from './utils/prompts';

@Injectable()
export class AppService {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_KEY,
    });
  }

  async quiz(prompt: string, language: string): Promise<string> {
    try {
      const completion = await this.openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'You are a helpful assistant.' },
          {
            role: 'user',
            content: `Please return only a valid JSON array without any additional text. Use ${language} language. Here is the prompt: ${prompt}`,

          },
        ],
      });
      return completion.choices[0].message.content;
    } catch (error) {
      throw new HttpException(
        'Failed to fetch completion',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async lessonQuiz(lesson: string, language: string): Promise<any> {
    try {
      const completion = await this.openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'You are a helpful assistant.' },
          {
            role: 'user',
            content: `Please respond with a valid JSON array, without surrounding it in quotes. Do not return the response as a string.. ${quizExplanationInstruction} ${lesson} ${quizFormatInstructions} . Use ${language} language.`,
          },
        ],
      });
      return completion.choices[0].message.content;
    } catch (error) {
      throw new HttpException(
        'Failed to fetch completion',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
