import { Controller, Body, Post, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { quizDto } from './dtos/quizDto.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  quiz(@Body() quizInformation: quizDto): Promise<string> {
    const prompt = `${process.env.PROMPT_INTRODUCTION} ${process.env.PROMPT_RATING}${quizInformation.rating},  ${process.env.PROMPT_LESSON}${quizInformation.lesson},  ${process.env.PROMPT_SUBJECT}${quizInformation.subject}.  ${process.env.PROMPT_AGE}${quizInformation.age}. ${process.env.PROMPT_EXAMPLE}. ${process.env.PROMPT_NUMBER_OF_QUESTIONS}`;
    return this.appService.quiz(prompt, quizInformation.language);
  }

  @Post("/lesson")
  lessonQuiz(@Body("lesson") lesson: string, @Body("language") language: string){
    return this.appService.lessonQuiz(lesson, language)
  }

  @Get('/health')
  healthCheck() {
    return { name: 'Almir', age: 30 };
  }
}
