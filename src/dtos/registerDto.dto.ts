import { IsEmail, IsString, MinLength } from 'class-validator';

export class registerDto {
    @IsString()
    username: string

    @IsEmail()
    email: string

    @MinLength(8)
    password: string
}