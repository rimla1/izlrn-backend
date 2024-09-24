import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt } from 'passport-jwt';
import { Strategy } from 'passport-jwt';
import * as dotenv from 'dotenv'
import { Injectable } from '@nestjs/common';
dotenv.config()

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy){
    constructor(){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.SECRET_JWT
        })
    }

    validate(payload: any){
        return {username: payload.username, email: payload.email}
    }
}