import { Controller, Body, Post, Get, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { JWTGuard } from './auth/guards/jwt.guard';
import { quizDto } from './dtos/quizDto.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("/")
  test(){
    return "Hello world!"
  }

  @Post()
  @UseGuards(JWTGuard)
  async quiz(@Req() req, @Body() quizInformation: quizDto): Promise<string> {
    return this.appService.quiz(quizInformation, req.user.email);
  }

  @Post("/lesson")
  @UseGuards(JWTGuard)
  async lessonQuiz(@Body("lesson") lesson: string, @Body("language") language: string, @Req() req){
    return this.appService.lessonQuiz(lesson, language, req.user.email)
  }

  @Get('/health')
  async health(){
    return "Checking the health of the application!"
  }

}
