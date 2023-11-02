/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "../entities/user.entity";
import {UserRepository} from "../repository/user.repository";
import {JwtPayload} from "../../../commons/interfaces/jwt-interface";
import {AuthConstants} from "../../../commons/constants/auth-constants";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(private readonly userRepository:UserRepository){
        super({
            jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration:false,
            secretOrKey:AuthConstants.secretKey,

        });
    }

    async validate(payload:JwtPayload):Promise<User>{
        const {emailOrUserName} = payload;
        const user = await this.userRepository.findByEmail(emailOrUserName);
        if(!user){
            const user = await this.userRepository.findByUsername(emailOrUserName)
            if (!user){
                throw new UnauthorizedException('user not authorize')
            }
            return user
        }
        return user;
    }
}