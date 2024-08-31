import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import OpenAI from 'openai';

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
          { role: 'user',  content: `Please return only a valid JSON array without any additional text. Use ${language} language. Here is the prompt: ${prompt}`  },
        ],
      });
      return completion.choices[0].message.content;
    } catch (error) {
      throw new HttpException('Failed to fetch completion', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
