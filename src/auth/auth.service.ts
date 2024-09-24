import {
  HttpException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { loginDto } from 'src/dtos/loginDto.dto';
import { registerDto } from 'src/dtos/registerDto.dto';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly authRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async login(email: string, password: string): Promise<any> {
    try {
      const user = await this.authRepository.findOne({ where: { email } });
      if (!user || !(await bcrypt.compare(password, user.password)))
        throw new UnauthorizedException('Invalid Credentials');

      const {
        password: omitPassword,
        quizAttempts: omitquizAttempts,
        lessonToQuizAttempts: omitLessonToQuizAttempts,
        ...userData
      } = user;
      return this.jwtService.sign(userData);
    } catch (error) {
      throw error;
    }
  }

  async register(registerDto: registerDto): Promise<any> {
    try {
      const { username, email, password } = registerDto;
      const alreadyExist = await this.authRepository.findOne({
        where: { email },
      });
      if (alreadyExist)
        throw new HttpException('E-mail is already in use', 409);
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User();
      newUser.username = username;
      newUser.email = email;
      newUser.password = hashedPassword;
      const user = await this.authRepository.save(newUser);
      const {
        password: omitPassword,
        quizAttempts: omitquizAttempts,
        lessonToQuizAttempts: omitLessonToQuizAttempts,
        ...userData
      } = user;
      return this.jwtService.sign(userData);
    } catch (error) {
      throw error;
    }
  }

  async checkQuizAttempts(user: User): Promise<boolean> {
    return user.quizAttempts > 0 ? true : false;
  }

  async checkLessonToQuizAttempts(user: User): Promise<boolean> {
    return user.lessonToQuizAttempts > 0 ? true : false;
  }

  async findUser(email: string) {
    const user = await this.authRepository.findOne({ where: { email: email } });
    if (!user) throw new NotFoundException(`User with ${email} not found!`);
    return user;
  }

  async updateUserQuizAttempts(user: User, updatedQuizAttempts: number) {
    user.quizAttempts = updatedQuizAttempts;
    await this.authRepository.save(user);
  }

  async updateUserLessonToQuizAttempts(
    user: User,
    updateQuizToLessonAttempts: number,
  ) {
    user.lessonToQuizAttempts = updateQuizToLessonAttempts;
    await this.authRepository.save(user);
  }

  async getQuizAttempts(email: string): Promise<number> {
    const { quizAttempts } = await this.authRepository.findOne({
      where: { email: email },
    });
    return quizAttempts;
  }
}
