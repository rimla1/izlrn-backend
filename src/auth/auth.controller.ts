import { Body, Controller, Get, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { loginDto } from 'src/dtos/loginDto.dto';
import { AuthService } from './auth.service';
import { registerDto } from 'src/dtos/registerDto.dto';
import { LocalGuard } from './guards/local.guard';
import { JWTGuard } from './guards/jwt.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}


    @Post("login")
    @UseGuards(LocalGuard)
    login(@Body() loginDto: loginDto){
        try {
            const {email, password} = loginDto
            return this.authService.login(email, password)
        } catch (error) {
            throw error
        }

    }

    @Post("register")
    register(@Body() registerDto: registerDto){
        try {
            return this.authService.register(registerDto)
        } catch (error) {
            throw error
        }
    }

    @Get('quiz-attempts')
    @UseGuards(JWTGuard)
    async getQuizAttempts(@Req() req): Promise<number>{
        return this.authService.getQuizAttempts(req.user.email)
    }

}
