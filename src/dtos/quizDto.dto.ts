import { IsInt, IsString, Max, MaxLength, Min } from 'class-validator';

export class quizDto {
  @IsInt()
  @Min(1)
  @Max(10)
  rating: number;

  @IsString() 
  @MaxLength(100) 
  lesson: string;

  @IsString() 
  @MaxLength(100) 
  subject: string;

  @IsInt()
  @Min(1) 
  @Max(200) 
  age: number;

  @IsString()
  language: string;
}
